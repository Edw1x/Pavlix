import { Observable, map, of, pipe, switchMap, tap } from 'rxjs';

import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

import { TitleModel } from '../shared/interfaces/title.interface';
import { ApiService } from '../shared/services/api.service';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TitleDetails } from '../shared/interfaces/title-details.interface';

export type TitlesState = {
    favouriteTitles: TitleModel[];
    searchedText: string;
    titles: TitleModel[];
    selectedTitleId: string;
    selectedTitleDetails: TitleDetails;
    isLoading: boolean;
    showFavourites: boolean;
};

const initialState: TitlesState = {
    searchedText: '',
    favouriteTitles: [],
    titles: [],
    selectedTitleId: '',
    selectedTitleDetails: {} as TitleDetails,
    isLoading: false,
    showFavourites: false,
};

export const TitlesStore = signalStore(
    withState(initialState),
    withComputed(({ searchedText, titles, showFavourites, favouriteTitles }) => ({
        filteredTitlesBySearchQuery: computed(() => {
            const titleList = showFavourites() ? favouriteTitles : titles;
            return titleList().filter(title => title.title.toLocaleLowerCase().includes(searchedText()));
        }),
    })),
    withMethods((state, apiService = inject(ApiService)) => {
        const { favouriteTitles } = state;

        return {
            patchFavouriteTitles: (title: TitleModel) => {
                let titles = [];

                if (favouriteTitles().find(favouriteTitle => title.id === favouriteTitle.id)) {
                    titles = favouriteTitles().filter(favouriteTitle => favouriteTitle.id !== title.id);
                } else {
                    titles = [...favouriteTitles(), title];
                }

                patchState(state, { favouriteTitles: titles });

                let titlesString = JSON.stringify(favouriteTitles());
                localStorage.setItem('favouriteTitles', titlesString);
            },
            patchSearchedText: (searchedText: string) => {
                patchState(state, { searchedText });
            },
            patchSelectedTitleId: (selectedTitleId: string) => {
                patchState(state, { selectedTitleId });
            },
            patchShowFavourite: (showFavourites: boolean) => {
                patchState(state, { showFavourites, searchedText: '' });
            },
            loadTitles: (): Observable<TitleModel[]> => {
                patchState(state, { isLoading: true });

                return apiService.getTitles().pipe(
                    tapResponse({
                        next: titles => patchState(state, { titles }),
                        error: console.error,
                        finalize: () => patchState(state, { isLoading: false }),
                    })
                );
            },
            //TODO: REMOVE TITLES FROM PATCH AFTER ALL FIXES
            loadFavouritesTitles: (): Observable<TitleModel[]> => {
                patchState(state, { isLoading: true });

                return of(localStorage.getItem('favouriteTitles')).pipe(
                    map((favouriteTitles: string | null) =>
                        favouriteTitles?.length ? (JSON.parse(favouriteTitles) as TitleModel[]) : []
                    ),
                    tapResponse({
                        next: favouriteTitles => patchState(state, { favouriteTitles, titles: favouriteTitles }),
                        error: console.error,
                        finalize: () => patchState(state, { isLoading: false }),
                    })
                );
            },
            getTitleDetails: rxMethod<string>(
                pipe(
                    tap(() => patchState(state, { isLoading: true })),
                    switchMap(selectedTitle => {
                        // const request = selectedTitleId.length
                        //     ? apiService.getTitleById(selectedTitleId)
                        //     : of({} as TitleModel);

                        return of({
                            rank: 1,
                            title: 'The Shawshank Redemption',
                            thumbnail:
                                'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg',
                            rating: '9.3',
                            id: 'top1',
                            year: 1994,
                            image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg',
                            big_image:
                                'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@',
                            description:
                                'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                            trailer: 'https://www.youtube.com/watch?v=NmzuHjWmXOc',
                            trailer_embed_link: 'https://www.youtube.com/embed/NmzuHjWmXOc',
                            trailer_youtube_id: 'NmzuHjWmXOc',
                            genre: ['Drama'],
                            director: ['Frank Darabont'],
                            writers: [
                                'Stephen King(based on the short novel "Rita Hayworth and the Shawshank Redemption" by)',
                                'Frank Darabont(screenplay by)',
                            ],
                            imdbid: 'tt0111161',
                            imdb_link: 'https://www.imdb.com/title/tt0111161',
                        }).pipe(
                            tapResponse({
                                next: selectedTitleDetails =>
                                    patchState(state, { selectedTitleDetails, isLoading: false }),
                                error: err => {
                                    patchState(state, { isLoading: false });
                                    console.error(err);
                                },
                            })
                        );
                    })
                )
            ),
        };
    }),
    withHooks({
        onInit({ loadTitles, loadFavouritesTitles, getTitleDetails, selectedTitleId }) {
            // loadTitles().pipe(takeUntilDestroyed()).subscribe();
            loadFavouritesTitles().pipe(takeUntilDestroyed()).subscribe();
            getTitleDetails(selectedTitleId);
        },
    })
);

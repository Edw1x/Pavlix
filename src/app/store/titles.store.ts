import { map, Observable, of, pipe, switchMap, tap } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { TitleDetails } from '../shared/interfaces/title-details.interface';
import { TitleModel } from '../shared/interfaces/title.interface';
import { ApiService } from '../shared/services/api.service';
import { TEMPORARY_STORE_DATA } from './store-temporary-data.const';

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

export type TitlesStore = InstanceType<typeof TitlesStore>;

export const TitlesStore = signalStore(
    withState(initialState),
    withComputed(({ searchedText, titles, showFavourites, favouriteTitles }) => ({
        filteredTitlesBySearchQuery: computed(() => {
            const titleList = showFavourites() ? favouriteTitles : titles;
            return titleList().filter(title => title.title.toLocaleLowerCase().includes(searchedText()));
        }),
    })),
    withMethods((state, apiService = inject(ApiService), isBrowser = isPlatformBrowser(inject(PLATFORM_ID))) => {
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
                        error: error =>
                            patchState(state, {
                                titles: TEMPORARY_STORE_DATA,
                            }),
                        finalize: () => patchState(state, { isLoading: false }),
                    })
                );
            },
            loadFavouritesTitles: (): Observable<TitleModel[]> => {
                patchState(state, { isLoading: true });
                let titles: string | null = null;

                if (isBrowser) {
                    titles = localStorage.getItem('favouriteTitles');
                }

                return of(titles).pipe(
                    map((favouriteTitles: string | null) =>
                        favouriteTitles?.length ? (JSON.parse(favouriteTitles) as TitleModel[]) : []
                    ),
                    tapResponse({
                        next: favouriteTitles => patchState(state, { favouriteTitles }),
                        error: console.error,
                        finalize: () => patchState(state, { isLoading: false }),
                    })
                );
            },
            getTitleDetails: rxMethod<string>(
                pipe(
                    tap(() => patchState(state, { isLoading: true, selectedTitleDetails: {} as TitleDetails })),
                    switchMap(selectedTitleId => {
                        const request = selectedTitleId.length
                            ? apiService.getTitleById(selectedTitleId)
                            : of({} as TitleModel);

                        return request.pipe(
                            tapResponse({
                                next: selectedTitleDetails =>
                                    patchState(state, { selectedTitleDetails, isLoading: false }),
                                error: err => {
                                    patchState(state, {
                                        isLoading: false,
                                        selectedTitleDetails: state
                                            .titles()
                                            .find(title => title.id === selectedTitleId),
                                    });
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
            loadTitles().pipe(takeUntilDestroyed()).subscribe();
            loadFavouritesTitles().pipe(takeUntilDestroyed()).subscribe();
            getTitleDetails(selectedTitleId);
        },
    })
);

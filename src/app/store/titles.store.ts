import { Observable, map, of } from 'rxjs';

import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

import { TitleModel } from '../shared/interfaces/title.interface';
import { ApiService } from '../shared/services/api.service';

export type TitlesState = {
    favouriteTitles: TitleModel[];
    searchedText: string;
    titles: TitleModel[];
    selectedTitle: TitleModel;
    isLoading: boolean;
    showFavourites: boolean;
};

const initialState: TitlesState = {
    searchedText: '',
    favouriteTitles: [],
    titles: [],
    selectedTitle: {} as TitleModel,
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
            patchShowFavourite: (showFavourites: boolean) => {
                patchState(state, { showFavourites });
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
            loadFavouritesTitles: (): Observable<TitleModel[]> => {
                patchState(state, { isLoading: true });

                return of(localStorage.getItem('favouriteTitles')).pipe(
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
        };
    }),
    withHooks({
        onInit({ loadTitles, loadFavouritesTitles }) {
            loadTitles().pipe(takeUntilDestroyed()).subscribe();
            loadFavouritesTitles().pipe(takeUntilDestroyed()).subscribe();
        },
    })
);

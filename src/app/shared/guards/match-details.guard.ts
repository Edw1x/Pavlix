import { CanMatchFn, Route } from '@angular/router';
import { TitlesStore } from '../../store/titles.store';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const canMatchDetailsGuard: CanMatchFn = (route, segments) => {
    const store = inject(TitlesStore);
    const id = segments[1].path;

    if (!store.titles().length) {
        return firstValueFrom(store.loadTitles()).then(() => checkIfTitleExist(store, id));
    } else {
        return checkIfTitleExist(store, id);
    }
};

function checkIfTitleExist(store: TitlesStore, id: string): boolean {
    const matchingTitle = store.titles().find(title => title.id === id);

    if (matchingTitle) {
        if (!store.selectedTitleId()) {
            store.patchSelectedTitleId(id);
        }
        return true;
    }

    return false;
}

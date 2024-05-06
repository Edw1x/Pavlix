import { CanMatchFn, Route } from '@angular/router';
import { TitlesStore } from '../../store/titles.store';
import { inject } from '@angular/core';

export const canMatchDetailsGuard: CanMatchFn = (route: Route, segments) => {
    const store = inject(TitlesStore);

    const id = segments[1].path;

    if (!!store.titles().find(title => title.id === id)) {
        if (!store.selectedTitleId()) {
            store.patchSelectedTitleId(id);
        }

        return true;
    }

    return false;
};

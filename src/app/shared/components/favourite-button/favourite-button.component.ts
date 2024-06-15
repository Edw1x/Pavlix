import { ChangeDetectionStrategy, Component, inject, input, OnChanges, signal } from '@angular/core';

import { TitlesStore } from '../../../store/titles.store';
import { TitleModel } from '../../interfaces/title.interface';

@Component({
    selector: 'app-favourite-button',
    standalone: true,
    templateUrl: './favourite-button.component.html',
    styleUrl: './favourite-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteButtonComponent implements OnChanges {
    showCounter = input<boolean>(false);
    title = input<TitleModel>();

    readonly store = inject(TitlesStore);

    public icon = signal('fa-regular');

    ngOnChanges(): void {
        this.checkFavouriteTitle();
    }

    get hasTitle(): boolean {
        return !!this.store.favouriteTitles().length && !this.showCounter() && !!this.title();
    }

    patchHeartIcon() {
        this.icon.set(this.icon() === 'fa-regular' ? 'fa' : 'fa-regular');
    }

    onTitleToFavouriteMove(): void {
        if (!!this.title()?.id.length) {
            this.store.patchFavouriteTitles(this.title()!);
            this.patchHeartIcon();
        }
    }

    private checkFavouriteTitle(): void {
        if (this.hasTitle) {
            if (this.store.favouriteTitles().find(favouriteTitle => this.title()?.id === favouriteTitle.id)) {
                this.patchHeartIcon();
            }
        }
    }
}

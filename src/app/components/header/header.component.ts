import { ChangeDetectionStrategy, Component, HostBinding, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FavouriteButtonComponent } from '../../shared/components/favourite-button/favourite-button.component';
import { TitlesStore } from '../../store/titles.store';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, FavouriteButtonComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @HostBinding('class.is-moving') private isMoving: boolean = false;

    @HostListener('document:wheel')
    private onWheel() {
        const wheelThreshold = 10;
        this.isMoving = window.scrollY > wheelThreshold;
    }

    readonly store = inject(TitlesStore);
}

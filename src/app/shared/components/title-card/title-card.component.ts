import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { FavouriteButtonComponent } from '../favourite-button/favourite-button.component';

export interface TitleCard {
    title: string;
    image: string;
    releaseDate: string;
}

@Component({
    selector: 'app-title-card',
    standalone: true,
    imports: [FavouriteButtonComponent],
    templateUrl: './title-card.component.html',
    styleUrl: './title-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
    public card = input.required<TitleCard>();
}

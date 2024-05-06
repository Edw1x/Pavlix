import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { TitleModel } from '../../interfaces/title.interface';
import { FavouriteButtonComponent } from '../favourite-button/favourite-button.component';
import { TitlesStore } from '../../../store/titles.store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-title-card',
    standalone: true,
    imports: [FavouriteButtonComponent],
    templateUrl: './title-card.component.html',
    styleUrl: './title-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
    public card = input.required<TitleModel>();
    public readonly store = inject(TitlesStore);
    private readonly router = inject(Router);

    onShowDetails() {
        const id = this.card().id;

        this.store.patchSelectedTitleId(id);
        this.router.navigate(['title-details/', id]);
    }
}

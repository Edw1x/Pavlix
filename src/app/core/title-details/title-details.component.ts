import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TitlesStore } from '../../store/titles.store';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-title-details',
    standalone: true,
    templateUrl: './title-details.component.html',
    styleUrl: './title-details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleDetailsComponent {
    public readonly store = inject(TitlesStore);
}

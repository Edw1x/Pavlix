import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { SanitizerPipe } from '../../shared/pipes/sanitizer.pipe';
import { TitlesStore } from '../../store/titles.store';

@Component({
    selector: 'app-title-details',
    standalone: true,
    imports: [SanitizerPipe],
    templateUrl: './title-details.component.html',
    styleUrl: './title-details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleDetailsComponent {
    public readonly store = inject(TitlesStore);
    public readonly location = inject(Location);

    public details = computed(() => this.store.selectedTitleDetails());
}

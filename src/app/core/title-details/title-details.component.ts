import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { TitlesStore } from '../../store/titles.store';
import { SanitizerPipe } from '../../shared/pipes/sanitizer.pipe';

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

    public details = computed(() => this.store.selectedTitleDetails());
}

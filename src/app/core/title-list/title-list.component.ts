import { debounceTime, distinctUntilChanged, map } from 'rxjs';

import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import { ScrollTopDirective } from '../../shared/directives/scroll-top.directive';
import { TitlesStore } from '../../store/titles.store';

export type SearchForm = FormGroup<{
    search: FormControl;
}>;

@Component({
    selector: 'app-title-list',
    standalone: true,
    imports: [TitleCardComponent, ReactiveFormsModule, LoadingIndicatorComponent, ScrollTopDirective, NgOptimizedImage],
    templateUrl: './title-list.component.html',
    styleUrl: './title-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleListComponent {
    readonly store = inject(TitlesStore);

    private readonly fb = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);

    searchForm: SearchForm = this.fb.group({
        search: this.fb.control(''),
    });

    ngOnInit(): void {
        const isFavourite = this.route.snapshot.data['isFavourite'] as boolean;

        this.store.patchShowFavourite(isFavourite);
    }

    ngAfterViewInit(): void {
        this.searchForm.controls.search.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                map((value: string) => value.toLocaleLowerCase())
            )
            .subscribe(value => this.store.patchSearchedText(value));
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TitleCard, TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map } from 'rxjs';

export type SearchForm = FormGroup<{
    search: FormControl;
}>;

@Component({
    selector: 'app-title-list',
    standalone: true,
    imports: [TitleCardComponent, ReactiveFormsModule],
    templateUrl: './title-list.component.html',
    styleUrl: './title-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleListComponent {
    private readonly fb = inject(FormBuilder);

    temporaryItems: TitleCard[] = [
        {
            title: 'Avatar: The Last Airbender',
            image: 'https://m.media-amazon.com/images/M/MV5BMTViNTY2MjMtYmUwOC00ZGYxLThjOWEtYjNjZWU3MTYwYzZmXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg',
            releaseDate: '2024',
        },
        {
            title: 'James Camerron Avatar',
            image: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
            releaseDate: '2009',
        },
        {
            title: 'Top Gun: Maverick',
            image: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
            releaseDate: '2022',
        },
        {
            title: 'Avatar: The Last Airbender',
            image: 'https://m.media-amazon.com/images/M/MV5BMTViNTY2MjMtYmUwOC00ZGYxLThjOWEtYjNjZWU3MTYwYzZmXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg',
            releaseDate: '2024',
        },
        {
            title: 'James Camerron Avatar',
            image: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
            releaseDate: '2009',
        },
        {
            title: 'Top Gun: Maverick',
            image: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
            releaseDate: '2022',
        },
        {
            title: 'Avatar: The Last Airbender',
            image: 'https://m.media-amazon.com/images/M/MV5BMTViNTY2MjMtYmUwOC00ZGYxLThjOWEtYjNjZWU3MTYwYzZmXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg',
            releaseDate: '2024',
        },
        {
            title: 'James Camerron Avatar',
            image: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
            releaseDate: '2009',
        },
        {
            title: 'Top Gun: Maverick',
            image: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
            releaseDate: '2022',
        },
        {
            title: 'Avatar: The Last Airbender',
            image: 'https://m.media-amazon.com/images/M/MV5BMTViNTY2MjMtYmUwOC00ZGYxLThjOWEtYjNjZWU3MTYwYzZmXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg',
            releaseDate: '2024',
        },
        {
            title: 'James Camerron Avatar',
            image: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
            releaseDate: '2009',
        },
        {
            title: 'Top Gun: Maverick',
            image: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
            releaseDate: '2022',
        },
    ];

    searchForm: SearchForm = this.fb.group({
        search: this.fb.control(''),
    });

    ngAfterViewInit(): void {
        this.searchForm.controls.search.valueChanges
            .pipe(
                debounceTime(500),
                map((value: string) => value.toLocaleLowerCase())
            )
            .subscribe(value => console.log(value));
    }
}

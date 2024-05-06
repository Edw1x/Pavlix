import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { TitleDetails } from '../interfaces/title-details.interface';
import { TitleModel } from '../interfaces/title.interface';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = 'https://imdb-top-100-movies.p.rapidapi.com/';

    getTitles(): Observable<TitleModel[]> {
        return this.http.get<TitleModel[]>(this.baseUrl);
    }

    getTitleById(id: string): Observable<TitleDetails> {
        return this.http.get<TitleModel>(this.baseUrl + id);
    }
}

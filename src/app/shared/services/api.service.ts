import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
}

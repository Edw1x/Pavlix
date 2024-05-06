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
    private readonly apiKey = '4f95d93ef0msh5b16dec56c8d16ep152673jsn4f7732b3c507';

    private readonly headers = new HttpHeaders({
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
    });

    getTitles(): Observable<TitleModel[]> {
        return this.http.get<TitleModel[]>(this.baseUrl, { headers: this.headers });
    }
}

import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
    const apiKey = 'f63c489e7dmshb4cde3113290588p1c7f45jsnc439ec84e3a8';

    const headers = new HttpHeaders({
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
    });

    const modifiedReq = req.clone({ headers });

    return next(modifiedReq);
};

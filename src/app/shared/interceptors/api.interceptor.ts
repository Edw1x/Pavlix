import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
    const apiKey = '4f95d93ef0msh5b16dec56c8d16ep152673jsn4f7732b3c507';

    const headers = new HttpHeaders({
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
    });

    const modifiedReq = req.clone({ headers });

    return next(modifiedReq);
};

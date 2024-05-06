import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
    InMemoryScrollingFeature,
    InMemoryScrollingOptions,
    provideRouter,
    withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { ApiInterceptor } from './shared/interceptors/api.interceptor';
import { TitlesStore } from './store/titles.store';

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, inMemoryScrollingFeature),
        provideHttpClient(withInterceptors([ApiInterceptor])),
        TitlesStore,
    ],
};

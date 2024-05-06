import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiInterceptor } from './shared/interceptors/api.interceptor';
import { TitlesStore } from './store/titles.store';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(withInterceptors([ApiInterceptor])), TitlesStore],
};

import { Routes } from '@angular/router';
import { canMatchDetailsGuard } from './shared/guards/match-details.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/home/home.component').then(x => x.HomeComponent),
    },
    {
        path: 'titles',
        loadComponent: () => import('./core/title-list/title-list.component').then(x => x.TitleListComponent),
        data: { isFavourite: false },
    },
    {
        path: 'favourite-titles',
        loadComponent: () => import('./core/title-list/title-list.component').then(x => x.TitleListComponent),
        data: { isFavourite: true },
    },
    {
        path: 'title-details/:id',
        loadComponent: () => import('./core/title-details/title-details.component').then(x => x.TitleDetailsComponent),
        canMatch: [canMatchDetailsGuard],
    },
    {
        path: '**',
        redirectTo: '',
    },
];

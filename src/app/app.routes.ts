import { Routes } from '@angular/router';

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
        path: '**',
        redirectTo: '',
    },
];

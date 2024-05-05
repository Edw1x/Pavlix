import { Component, input } from '@angular/core';

@Component({
    selector: 'app-favourite-button',
    standalone: true,
    templateUrl: './favourite-button.component.html',
    styleUrl: './favourite-button.component.scss',
})
export class FavouriteButtonComponent {
    showCounter = input<boolean>(false);

    favoritesCount = 5;

    public icon = 'fa-regular';
}

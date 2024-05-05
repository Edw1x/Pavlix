import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    favoritesCount = 5;
    icon = 'fa-regular';

    @HostBinding('class.is-moving') private isMoving: boolean = false;

    @HostListener('document:wheel')
    private onWheel() {
        const wheelThreshold = 10;
        this.isMoving = window.scrollY > wheelThreshold;
    }
}

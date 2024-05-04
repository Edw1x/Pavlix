import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    favoritesCount = 5;
    icon = 'fa-regular';

    public isMoving = false;

    @HostListener('document:wheel')
    private onWheel() {
        const wheelThreshold = 10;
        this.isMoving = window.scrollY > wheelThreshold;
    }
}

import { ViewportScroller } from '@angular/common';
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
    selector: '[appScrollTop]',
    standalone: true,
})
export class ScrollTopDirective {
    private readonly el = inject(ElementRef);
    private readonly viewportScroller = inject(ViewportScroller);

    private wheelThreshold = 500;

    @HostListener('document:wheel')
    private onWheel() {
        this.wheelThreshold = 500;
        this.setDisplayProperty();
    }

    @HostListener('click')
    onClick() {
        this.scrollToTop();
    }

    scrollToTop() {
        this.viewportScroller.scrollToPosition([0, 0]);
        this.wheelThreshold = 99999;
        this.setDisplayProperty();
    }

    private setDisplayProperty() {
        this.el.nativeElement.style.display = window.scrollY > this.wheelThreshold ? 'flex' : 'none';
    }
}

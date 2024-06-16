import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AccordionComponent } from '../../shared/components/accordion/accordion.component';
import { FAQ } from './home-faq.const';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [AccordionComponent, RouterLink, NgOptimizedImage],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    public readonly accordionItems = FAQ;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccordionComponent } from '../../shared/components/accordion/accordion.component';
import { FAQ } from './home-faq.const';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [AccordionComponent, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    public readonly accordionItems = FAQ;
}

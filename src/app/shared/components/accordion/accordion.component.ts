import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface AccordionItem {
    title: string;
    description: string;
}

@Component({
    selector: 'app-accordion',
    standalone: true,
    templateUrl: './accordion.component.html',
    styleUrl: './accordion.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
    items = input.required<AccordionItem[]>();
}

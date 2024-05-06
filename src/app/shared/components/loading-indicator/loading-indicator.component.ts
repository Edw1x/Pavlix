import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-loading-indicator',
    standalone: true,
    imports: [],
    template: `<div class="indicator"></div> `,
    styles: [
        `
            .indicator {
                width: 4rem;
                height: 4rem;
                background-size: contain;
                background-repeat: no-repeat;
                background-image: url('/assets/icons/spinner.svg');
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {}

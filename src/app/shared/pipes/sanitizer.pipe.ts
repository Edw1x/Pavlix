import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizer',
    standalone: true,
})
export class SanitizerPipe implements PipeTransform {
    private sanitizer = inject(DomSanitizer);

    transform(value: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class HighLightPipe implements PipeTransform {

    transform(text: string): string {

        return `<span class="highlight">${text}</span>`;
    }
}

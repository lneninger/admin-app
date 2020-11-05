import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gender'
})
export class GenderPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            let upper = value;
            if (typeof value === 'string') {
                upper = value.toUpperCase();
            }

            switch (upper) {
                case 'MALE':
                case 'MR':
                case 'MR.':
                    return 'Mr.';

                case 'FEMALE':
                case 'MS':
                case 'MS.':
                    return 'Ms.';

                default:
                    return '';
            }
        }
    }
}

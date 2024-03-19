import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'alphabetical',
    pure: false
})
export class AlphabeticalPipe implements PipeTransform {

    transform(items: any[], key): any {
        if (!items) {
            return [];
        }

        if (key) {
            items = items.sort(function (a, b) {
                if (a[key] > b[key]) {
                    return 1;
                }

                if (a[key] < b[key]) {
                    return -1;
                }

                return null;
            });
        } else {
            items = items.sort((a, b) => {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a.localeCompare(b);
            });
        }

        return items;
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'alphabetical',
    pure: false
})
export class AlphabeticalPipe implements PipeTransform {

    transform(items: any[]): any {
        if (!items) {
            return [];
        }

        items = items.sort(function (item1, item2) {
            if (item1.name > item2.name) {
                return 1;
            }

            if (item1.name < item2.name) {
                return -1;
            }
        });

        return items;
    }
}

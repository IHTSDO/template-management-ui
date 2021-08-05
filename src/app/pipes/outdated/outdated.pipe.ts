import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'outdated'
})
export class OutdatedPipe implements PipeTransform {

    transform(items: any[]): any[] {
        if (!items) {
            return [];
        }

        items = items.filter(item => !item.name.includes('OUTDATED'));
        return items;
    }
}

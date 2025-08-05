import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'acceptabilityMap' })
export class AcceptabilityMapPipe implements PipeTransform {

    transform(items: any[]): any {
        if (!items) {
            return [];
        }

        const us = items.find(item => item.includes('US'));
        items = items.filter(item => !item.includes('US'));
        items.unshift(us);

        return items;
    }

}

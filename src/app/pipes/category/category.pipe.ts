import {Pipe, PipeTransform} from '@angular/core';
import {SnomedUtilityService} from '../../services/snomedUtility/snomed-utility.service';

@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {

    transform(items: any[], category): any {
        if (!items) {
            return [];
        }

        if (!category) {
            return items;
        }

        items = items.filter(item => SnomedUtilityService.getSemanticTagFromFsn(item.name) === category);

        return items;
    }

}

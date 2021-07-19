import { Pipe, PipeTransform } from '@angular/core';
import {SnomedUtilityService} from '../../services/snomedUtility/snomed-utility.service';

@Pipe({
    name: 'alphabeticalSemanticTag',
    pure: false
})
export class AlphabeticalSemanticTagPipe implements PipeTransform {

    constructor() {
    }

    transform(items: any[]): any {
        if (!items) {
            return [];
        }

        items = items.sort(function (item1, item2) {
            if (SnomedUtilityService.getSemanticTagFromFsn(item1.name) > SnomedUtilityService.getSemanticTagFromFsn(item2.name)) {
                return 1;
            }

            if (SnomedUtilityService.getSemanticTagFromFsn(item1.name) < SnomedUtilityService.getSemanticTagFromFsn(item2.name)) {
                return -1;
            }
        });

        return items;
    }
}

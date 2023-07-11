import { Pipe, PipeTransform } from '@angular/core';
import {SnomedUtilityService} from '../../services/snomedUtility/snomed-utility.service';

@Pipe({
    name: 'alphabeticalSemanticTag',
    pure: false
})
export class AlphabeticalSemanticTagPipe implements PipeTransform {

    constructor() {
    }

    transform(items: any[], key: string): any {
        if (!items) {
            return [];
        }

        items = items.sort(function (a, b) {
            if (SnomedUtilityService.getSemanticTagFromFsn(a[key]) > SnomedUtilityService.getSemanticTagFromFsn(b[key])) {
                return 1;
            }

            if (SnomedUtilityService.getSemanticTagFromFsn(a[key]) < SnomedUtilityService.getSemanticTagFromFsn(b[key])) {
                return -1;
            }

            return null;
        });

        return items;
    }
}

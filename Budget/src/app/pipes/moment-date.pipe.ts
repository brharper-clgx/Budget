import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({
    name: 'momentDate'
})

/*
* Formats date object using moment.js
* Usage:
*   date | momentDate:'MM/DD/YYYY h:mm a'
* Example:
*   <div class="rfp-date">{{alternateBid(vendorBid).deliveryDate | momentDate:'MM/DD/YYYY h:mm a'}}</div>
*/
export class MomentDatePipe implements PipeTransform {
    transform(value: string, format: string = ''): string {
        if (!value || value === '') return '';
        return moment(value).format(format);
    }
}
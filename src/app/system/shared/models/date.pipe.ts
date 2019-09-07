import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appMoment'
})
export class DatePipe implements PipeTransform{
	transform(value: string, formatFrom: string, formatTo: string = "DD.MM.YYYY"):string{
		return moment(value, formatFrom).format(formatTo);
	}
}
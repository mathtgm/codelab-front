import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatetime',
  standalone: true
})
export class FormatDatetimePipe implements PipeTransform {

  transform(value: Date): unknown {
    value = new Date(value);
    return value.toLocaleString('pt-BR', { timeZone: 'UTC' }).replace(',', '');
  }

}

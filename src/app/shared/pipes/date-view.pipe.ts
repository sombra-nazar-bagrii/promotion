import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateView'
})
export class DateViewPipe implements PipeTransform {

  transform(date: string): string {
      const today = new Date();
      const publishFormattedDate = new Date(date)
      const daysAgo = Math.floor((today.getTime() - publishFormattedDate.getTime()) / (1000 * 3600 * 24));

      if (daysAgo === 0) return "today";
      if (daysAgo <= 20) return `${daysAgo} days ago`;
      return publishFormattedDate.toISOString();
    }
}

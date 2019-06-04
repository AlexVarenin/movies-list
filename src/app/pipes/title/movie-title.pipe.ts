import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieTitle'
})
export class MovieTitlePipe implements PipeTransform {

  transform(title: string): string {
    if (!title) {
      return title;
    }
    return title
      .toLowerCase()
      .replace(/[^a-z, 0-9, \n]/g, '')
      .split(' ')
      .map( word => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ')
      .trim();
  }

}

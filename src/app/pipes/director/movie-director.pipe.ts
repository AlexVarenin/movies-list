import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieDirector'
})
export class MovieDirectorPipe implements PipeTransform {

  transform(director: string, id): string {
    if (!director || director === 'N/A') {
      return id ? '-' : null;
    }
    return director;
  }

}

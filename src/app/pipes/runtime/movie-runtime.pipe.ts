import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieRuntime'
})
export class MovieRuntimePipe implements PipeTransform {

  transform(runtime: string, id): number {
    if (!runtime || runtime === 'N/A') {
      return id ? 0 : null;
    }
    return +(runtime.toString().replace(/[^0-9]/g, ''));
  }

}

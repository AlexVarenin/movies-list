import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import * as moviesSelectors from '@store/selectors/movies.selector';
import { first, map } from 'rxjs/operators';
import { PipeTransform } from '@angular/core';

export function titleExists(store: Store<fromRoot.State>, pipe: PipeTransform, id: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return store
      .select(state => moviesSelectors.getEntities(state.movies))
      .pipe(
        first(),
        map(movies => {
          const matchingMovie = movies
            .find(movie => pipe.transform(movie.Title.trim()) === pipe.transform(control.value.trim()));
          return (matchingMovie && !id && matchingMovie.imdbID !== id) ? { titleExists: true } : null;
      })
    );
  };
}

export function yearNotValid(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const year = control.value.year();
  return (year < 1895 || year > new Date().getFullYear()) ? { yearNotValid: true } : null;
}

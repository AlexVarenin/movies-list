import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import * as actions from '@store/actions/movies.actions';
import { MoviesService } from '@services/api/movies.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { NotificationService } from '@services/notification/notification.service';

@Injectable()
export class MoviesEffects {

  constructor(
    private actions$: Actions,
    private service: MoviesService,
    private store: Store<fromRoot.State>,
    private notification: NotificationService
  ) {
  }

  @Effect()
  getEntities: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MoviesActionType.GET_ENTITIES),
    switchMap((action: any) => {
      return this.service
        .getMovies(action.title)
        .pipe(
          map(response => {
            response.Search.forEach((movie => {
              this.store.dispatch(new actions.UpdateEntityById(movie.imdbID));
            }));
            return new actions.GetEntitiesSuccess(response);
          }),
          catchError(error => {
            this.parseError(error, 'Movie was not found');
            return of(new actions.GetEntitiesFailed(error));
          })
        );
    })
  );

  @Effect()
  getEntityById: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MoviesActionType.UPDATE_ENTITY_BY_ID),
    mergeMap((action: any) => {
      return this.service
        .getMovieById(action.id)
        .pipe(
          map(response => {
            return new actions.UpdateEntityByIdSuccess(response);
          }),
          catchError(error => {
            this.parseError(error);
            return of(new actions.UpdateEntityByIdFailed(error));
          })
        );
    })
  );

  @Effect()
  getAutocompleteEntityById: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MoviesActionType.GET_AUTOCOMPLETE_ENTITY),
    mergeMap((action: any) => {
      return this.service
        .getMovieById(action.id)
        .pipe(
          map(response => {
            return new actions.GetAutocompleteEntitySuccess(response);
          }),
          catchError(error => {
            this.parseError(error);
            return of(new actions.GetAutocompleteEntityFailed(error));
          })
        );
    })
  );

  @Effect()
  patchEntityById: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MoviesActionType.PATCH_ENTITY_BY_ID),
    mergeMap((action: any) => {
      return this.service
        .patchMovieById(action.id, action.payload)
        .pipe(
          map(response => {
            this.notification.success('Movie was updated successfully');
            return new actions.UpdateEntityByIdSuccess(response);
          }),
          catchError(error => {
            this.parseError(error, 'Error during updating movie. Try again later');
            return of(new actions.UpdateEntityByIdFailed(error));
          })
        );
    })
  );

  @Effect()
  deleteEntityById: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MoviesActionType.DELETE_ENTITY_BY_ID),
    mergeMap((action: any) => {
      return this.service
        .deleteMovieById(action.id)
        .pipe(
          map(response => {
            this.notification.success('Movie was deleted successfully');
            return new actions.DeleteEntityByIdSuccess(response);
          }),
          catchError(error => {
            this.parseError(error, 'Error during deleting movie. Try again later');
            return of(new actions.DeleteEntityByIdFailed(error));
          })
        );
    })
  );

  @Effect()
  createNewEntity: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MoviesActionType.CREATE_NEW_ENTITY),
    mergeMap((action: any) => {
      return this.service
        .createNewMovie(action.payload)
        .pipe(
          map(response => {
            this.notification.success('Movie was created successfully');
            return new actions.CreateNewEntitySuccess(response);
          }),
          catchError(error => {
            this.parseError(error, 'Error during creating movie. Try again later');
            return of(new actions.CreateNewEntityFailed(error));
          })
        );
    })
  );

  parseError(error: Error, message: string = null): void {
    // TO DO implementing parse(error) method
    const errorText = 'Oops, try again later';
    this.notification.error(message || errorText);
  }
}


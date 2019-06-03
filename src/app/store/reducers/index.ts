import { ActionReducerMap } from '@ngrx/store';
import * as moviesReducer from '@store/reducers/movies.reducer';

export interface State {
  movies: moviesReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  movies: moviesReducer.reducer,
};

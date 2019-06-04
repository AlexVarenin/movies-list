import * as actions from '@store/actions/movies.actions';
import { MovieModel } from '@store/models/movie.model';

export interface State {
  Search: MovieModel[];
  totalResults: number;
}

export const initialState: State = {
  Search: [],
  totalResults: 0,
};

export function reducer(state = initialState, action: actions.Action) {
  switch (action.type) {
    case actions.MoviesActionType.GET_ENTITIES_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case actions.MoviesActionType.GET_AUTOCOMPLETE_ENTITY_SUCCESS: {
      const newState = {
        Search: [action.payload],
        totalResults: 1
      };
      return {
        ...state,
        ...newState
      };
    }

    case actions.MoviesActionType.UPDATE_ENTITY_BY_ID_SUCCESS: {
      const indx = state.Search.findIndex((item: any) => item.imdbID === action.payload.imdbID);
      const movies = JSON.parse(JSON.stringify(state.Search));
      movies[indx] = action.payload;
      const newState = {
        Search: movies,
        totalResults: state.totalResults
      };
      return {
        ...state,
        ...newState
      };
    }
    case actions.MoviesActionType.CREATE_NEW_ENTITY_SUCCESS: {
      const newState = {
        Search: [action.payload, ...state.Search],
        totalResults: state.totalResults++
      };
      return {
        ...state,
        ...newState
      };
    }
    case actions.MoviesActionType.DELETE_ENTITY_BY_ID_SUCCESS: {
      const newState = {
        Search: state.Search.filter( movie => movie.imdbID !== action.id),
        totalResults: state.totalResults--
      };
      return {
        ...state,
        ...newState
      };
    }
    default:
      return state;
  }
}


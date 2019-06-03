import * as reducer from '@store/reducers/movies.reducer';

export const getEntities = (state: reducer.State) => {
  return state.Search;
};

export const getEntityById = (state: reducer.State, imdbID: string) => {
  const filteredArray = state.Search.filter(item => item.imdbID === imdbID);
  return filteredArray.length ? filteredArray[0] : null;
};

export const getEntitiesTotal = (state: reducer.State) => {
  return +state.totalResults;
};

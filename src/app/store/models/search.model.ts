import { MovieModel } from '@store/models/movie.model';

export interface SearchModel {
  Search: MovieModel[];
  totalResults: string;
}

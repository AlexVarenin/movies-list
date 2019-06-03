import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { MovieModel } from '@store/models/movie.model';
import { SearchModel } from '@store/models/search.model';
import { createRandomString } from '@services/helpers/helpers.helper';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {
  }

  getMovies(title: string): Observable<SearchModel> {
    const httpParams = new HttpParams()
      .set('s', title)
      .set('type', 'movie');
    return this.http.get<SearchModel>('/', { params: httpParams })
      .pipe(catchError((error: any) => throwError(error)));
  }

  getMovieById(imdbID: string): Observable<MovieModel> {
    const httpParams = new HttpParams()
      .set('i', imdbID);
    return this.http.get<MovieModel>('/', { params: httpParams })
      .pipe(catchError((error: any) => throwError(error)));
  }

  // fake api call
  patchMovieById(imdbID: string, movie: MovieModel): Observable<MovieModel> {
    return of(movie).pipe(delay(1000));
  }

  // fake api call
  createNewMovie(movie: MovieModel): Observable<MovieModel> {
    movie.imdbID = createRandomString(9);
    return of(movie).pipe(delay(1000));
  }

  deleteMovieById(imdbID: string): Observable<string> {
    return of(imdbID).pipe(delay(1000));
  }
}

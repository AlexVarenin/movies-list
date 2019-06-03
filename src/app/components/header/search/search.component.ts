import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators/';
import { MoviesService } from '@services/api/movies.service';
import { SearchModel } from '@store/models/search.model';
import { MovieModel } from '@store/models/movie.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import * as moviesActions from '@store/actions/movies.actions';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  movies: MovieModel[];
  movieTitleControl = new FormControl();
  private readonly onDestroy = new Subject<void>();
  constructor(
    private moviesService: MoviesService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.movieTitleControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
      .pipe(takeUntil(this.onDestroy))
      .subscribe(query => {
        if (query) {
          this.moviesService.getMovies(query).subscribe(
            (response: SearchModel) => this.movies = response.Search,
            (error: any) => {}
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  refresh(): void {
    this.movieTitleControl.reset();
    this.store.dispatch(new moviesActions.GetEntities(environment.initialSearch));
  }

  initiateSearch(e): void {
    e.stopPropagation();
    const code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) {
      this.search();
    }
  }

  search(): void {
    this.navigateToList();
    const searchValue = this.movieTitleControl.value;
    if (searchValue) {
      this.store.dispatch(new moviesActions.GetEntities(searchValue));
    }
  }

  searchById(id: string): void {
    this.navigateToList();
    this.store.dispatch(new moviesActions.GetAutocompleteEntity(id));
    this.movieTitleControl.reset();
  }

  private navigateToList() {
    if (this.router.url !== '/list') {
      this.router.navigate(['/list']);
    }
  }
}

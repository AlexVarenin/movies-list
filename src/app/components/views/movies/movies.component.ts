import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moviesSelectors from '../../../store/selectors/movies.selector';
import { MovieModel } from '../../../store/models/movie.model';
import { MatDialog } from '@angular/material';
import { MovieEditComponent} from '../../modals/movie-edit/movie-edit.component';
import { DeleteConfirmComponent } from '../../modals/delete-confirm/delete-confirm.component';

@Component({
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies: MovieModel[];
  private readonly onDestroy = new Subject<void>();

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.store.select(state => state.movies)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        this.movies = moviesSelectors.getEntities(data);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  openViewModal(imdbID: string) {
    const config = {
      data: { imdbID, viewMode: true },
      panelClass: ['default-modal'],
    };
    this.dialog.open(
      MovieEditComponent,
      config
    );
  }

  openEditModal(imdbID: string) {
    const config = {
      data: { imdbID },
      panelClass: ['default-modal'],
    };
    this.dialog.open(
      MovieEditComponent,
      config
    );
  }

  openAddNewModal() {
    const config = {
      data: { imdbID: null },
      panelClass: ['default-modal'],
    };
    this.dialog.open(
      MovieEditComponent,
      config
    );
  }

  openDeleteConfirmationModal(movie: MovieModel) {
    const config = {
      data: { movie },
      panelClass: ['default-modal'],
    };
    this.dialog.open(
      DeleteConfirmComponent,
      config
    );
  }
}

import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MovieModel } from '@store/models/movie.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moviesSelectors from '@store/selectors/movies.selector';
import { Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moviesActions from '@store/actions/movies.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { titleExists, yearNotValid } from '@services/helpers/validators.validator';
import { MovieTitlePipe } from '@app/pipes/title/movie-title.pipe';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
  },
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss'],
  providers: [
    MovieTitlePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MovieEditComponent implements OnInit, OnDestroy {

  @Input() movie: MovieModel;
  viewMode: boolean;
  matcher = new MyErrorStateMatcher();
  form: FormGroup;
  minDate = moment().year(1894);
  maxDate = moment();

  private readonly onDestroy = new Subject<void>();

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<MovieEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private titlePipe: MovieTitlePipe) {
  }

  ngOnInit() {
    const id = this.data.imdbID;
    this.viewMode = this.data.viewMode;
    if (id) {
      this.store
        .select(state => moviesSelectors.getEntityById(state.movies, id))
        .pipe(takeUntil(this.onDestroy))
        .subscribe(movie => {
          this.movie = movie;
          this.createForm();
        });
    } else {
      this.movie = { imdbID: null, Title: null };
      this.createForm();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.formBuilder.group({
      Title: [this.movie.Title, [Validators.required], [titleExists(this.store, this.titlePipe, this.movie.imdbID)]],
      Year: [this.movie.Year ? moment().year(+this.movie.Year) : null, [Validators.required, yearNotValid]],
      Runtime: [this.initialRuntimeNormalize(this.movie.Runtime), Validators.required],
      Genre: [this.movie.Genre, Validators.required],
      Director: [this.initialDirectorNormalize(this.movie.Director), Validators.required],
    });
  }

  onYearSelected(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.form.get('Year').value || moment();
    ctrlValue.year(normalizedYear.year());
    this.form.get('Year').setValue(ctrlValue);
    datepicker.close();
  }

  onSubmit() {
    if (!this.form.valid) {
      this.showErrors();
      return;
    }
    const formValues: {[key: string]: any} = this.normalizeFormValues(this.form.value);

    if (this.movie.imdbID) {
      formValues.imdbID = this.movie.imdbID;
      this.store.dispatch(new moviesActions.PatchEntityById(this.movie.imdbID, formValues));
    } else {
      this.store.dispatch(new moviesActions.CreateNewEntity(formValues));
    }
    this.onClose();
  }

  cancelForm(): void {
    this.onClose();
  }

  private initialRuntimeNormalize(runtime: string): number {
    if (!runtime || runtime === 'N/A') {
      return this.movie.imdbID ? 0 : null;
    }
    return +(runtime.replace(/[^0-9]/g, ''));
  }

  private initialDirectorNormalize(director: string): string {
    if (!director || director === 'N/A') {
      return this.movie.imdbID ? '-' : null;
    }
    return director;
  }

  private normalizeFormValues(values: {[key: string]: any}): {[key: string]: any} {
    values.Title = values.Title.trim();
    values.Year = values.Year.year().toString();
    values.Runtime = `${values.Runtime} min`;
    values.Genre = values.Genre.trim();
    values.Director = values.Director.trim();
    return values;
  }

  private showErrors(): void {
    Object.keys(this.form.controls).forEach(field => {
      this.form.get(field).markAsTouched({onlySelf: true});
    });
  }
}

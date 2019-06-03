import {Component, Inject, Input, OnInit} from '@angular/core';
import {MovieModel} from '@store/models/movie.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moviesActions from '@store/actions/movies.actions';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  @Input() movie: MovieModel;

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.movie = this.data.movie;
  }

  onConfirm(): void {
    this.store.dispatch(new moviesActions.DeleteEntityById(this.movie.imdbID));
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}

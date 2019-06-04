// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './components/containers/default-layout/default-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { P404Component } from '@app/components/views/error/404.component';
import { MoviesComponent } from './components/views/movies/movies.component';
import { MovieEditComponent } from './components/modals/movie-edit/movie-edit.component';
import { DeleteConfirmComponent } from './components/modals/delete-confirm/delete-confirm.component';
import { SearchComponent } from './components/header/search/search.component';

// Pipes
import { MovieTitlePipe } from './pipes/title/movie-title.pipe';

// Services
import { MoviesService } from '@services/api/movies.service';
import { NotificationService } from '@services/notification/notification.service';

// Interceptors
import { httpInterceptorProviders } from '@services/interceptors/http-interceptors';

// Store
import { StoreModule } from '@ngrx/store';
import { reducers } from '@store/reducers';

// Effects
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from '@store/effects/movies.effects';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
];

const EFFECTS = [
  MoviesEffects
];

const SERVICES = [
  MoviesService,
  NotificationService
];

const ENTRY_COMPONENTS = [
  MovieEditComponent,
  DeleteConfirmComponent
];

const MATERIAL_MODULES = [
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    HeaderComponent,
    P404Component,
    MoviesComponent,
    MovieEditComponent,
    DeleteConfirmComponent,
    SearchComponent,
    MovieTitlePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([...EFFECTS]),
  ],
  providers: [
    ...SERVICES,
    httpInterceptorProviders
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

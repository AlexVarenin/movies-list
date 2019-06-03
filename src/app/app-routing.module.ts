import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '@app/components/containers/default-layout/default-layout.component';
import { MoviesComponent } from '@app/components/views/movies/movies.component';
import { P404Component } from '@app/components/views/error/404.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '', component: DefaultLayoutComponent, children: [
      { path: 'list', component: MoviesComponent },
      { path: '404', component: P404Component },
    ] },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

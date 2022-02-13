import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import { AdminMoviesComponent } from './components/admin-movies/admin-movies.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReserveComponent } from './components/reserve/reserve.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {path:'login', component: LoginComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'movies', component: MoviesListComponent},
  {path:'movie/:id', component:MovieDetailComponent},
  {path:'reservations', component:ReserveComponent},
  {path:'movies-admin', component:AdminMoviesComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  HomeComponent,
];

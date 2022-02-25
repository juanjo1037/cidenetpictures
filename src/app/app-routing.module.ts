import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import { AdminMoviesComponent } from './components/admin-movies/admin-movies.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { AdminPresentationsComponent } from './components/admin-presentations/admin-presentations.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { CreatePresentationComponent } from './components/admin-presentations/create-presentation/create-presentation.component';
import { MovieGuardService as guard } from './services/guards/movie-guard.service';
import { LoginGuard as lGuard } from './services/guards/login.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {path:'login', component: LoginComponent, canActivate: [lGuard]},
  {path:'registration', component: RegistrationComponent, canActivate: [lGuard]},
  {path:'movies', component: MoviesListComponent},
  {path:'movie/:id', component:MovieDetailComponent},
  {path:'reservations', component:ReserveComponent, canActivate: [guard], data: { expectedRole: ['admin', 'user']}},
  {path:'movies-admin', component:AdminMoviesComponent, canActivate: [guard], data: { expectedRole: ['admin']}},
  {path:'create-movies', component:CreateMovieComponent, canActivate: [guard], data: { expectedRole: ['admin']}},
  {path:'edit-movie/:id', component:EditMovieComponent, canActivate: [guard], data: { expectedRole: ['admin']}},
  {path: 'presentations-admin', component:AdminPresentationsComponent, canActivate: [guard], data: { expectedRole: ['admin']}},
  {path:'create-presentations', component:CreatePresentationComponent, canActivate: [guard], data: { expectedRole: ['admin']}},
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

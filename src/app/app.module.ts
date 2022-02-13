import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { SliderComponent } from './components/slider/slider.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {MatMenuModule} from '@angular/material/menu';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { ChairReservationComponent } from './components/chair-reservation/chair-reservation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { interceptorProvider } from './services/interceptors/reserve-interceptor.service';
import { AdminMoviesComponent } from './components/admin-movies/admin-movies.component';
import { AdminPresentationsComponent } from './components/admin-presentations/admin-presentations.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import {MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    MoviesListComponent,
    MovieDetailComponent,
    ChairReservationComponent,
    AdminMoviesComponent,
    AdminPresentationsComponent,
    ReserveComponent,
    ReservationDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    MatNativeDateModule,
    FormsModule,
    MatMenuModule,
    NgbModule,
    SweetAlert2Module.forRoot()



  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/chair';
import { Movies } from 'src/app/models/movies';
import { Movie, Presentation } from 'src/app/models/presentation.interface';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url= environment.url;

  constructor( private http:HttpClient) { }

  getMoviesOnBillboard():Observable<Movies[]>
  {
    let address= this.url+"movie"
    let options={
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.get<Movies[]>(address, options);
  }
  getMoviesComingSoon():Observable<Movies[]>
  {
    let address= this.url+"movie/coming_soon"
    let options={
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.get<Movies[]>(address, options);
  }
  getMoviesByGenre(genre:string):Observable<Movies[]>
  {
    let address= this.url+"movie/list"
    let options={
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      params:{'genre': genre}
    }
    return this.http.get<Movies[]>(address, options);
  }
  getMovieById(id:number):Observable<Movies> {
    let address= this.url+"movie/"+ id
    let options={
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.get<Movies>(address, options);
  }
  getAllMovies():Observable<Movies[]>
  {
    let address= this.url+"movie/all"
    let options={
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.get<Movies[]>(address, options);
  }
  getAllRooms():Observable<Room[]>{
    let address=this.url+"presentation/room"
    let options={
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.get<Room[]>(address,options);
  }
  deleteMovie(id :number): Observable<any>{
    let address = this.url+"movie/"+id;
    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),

    }
    return this.http.delete<any>(address,options);

  }
  createMovie(movieForm:Movies):Observable<any>{
    return this.http.post<any>(this.url+'movie',movieForm);
  }
  updateMovie(movieForm:Movies,id:number):Observable<any>{
    return this.http.put<any>(this.url+'movie/'+id , movieForm);
  }
  createPresentation(presentation):Observable<any>{
    return this.http.post<any>(this.url+'presentation',presentation);
  }
  updatePresentation(presentation):Observable<any>{
    return this.http.put<any>(this.url+'presentation',presentation);
  }
}

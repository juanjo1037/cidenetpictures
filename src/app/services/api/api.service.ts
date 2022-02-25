import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Id, Reservation } from 'src/app/models/reservation.interface';
import { environment } from 'src/environments/environment';
import { Presentation } from 'src/app/models/presentation.interface';
import { Chair } from 'src/app/models/chair';
import { ReservedChair } from 'src/app/models/reservedChair.interface';
import { newReservation } from 'src/app/models/newReservation';
@Injectable({
  providedIn: 'root'
})
export class ApiService {




url= environment.url;


  constructor(private http:HttpClient) { }



  getReservations(email:string):Observable<Reservation[]>{
    let address = this.url + "reservation";
    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      params:{'email': email}
    }
    return this.http.get<Reservation[]>(address, options);
  }
  deleteReservation(id :object): Observable<any>{
    let address = this.url+"reservation/";
    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      body: id

    }
    return this.http.delete<any>(address,options);

  }
  deleteChairs(chairsToDelete:object): Observable<any>{
    let address = this.url+"reservation/delete-chairs";
    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      body: chairsToDelete

    }
    return this.http.delete<any>(address,options);

  }
  getPresentationByMovie(id:number){
    let address = this.url + "presentation/"+id
    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })

    }
    return this.http.get<Presentation[]>(address, options);
  }
  getPresentations(){
    let address = this.url + "presentation"
    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })

    }
    return this.http.get<Presentation[]>(address, options);
  }
  getChairsByRoom(idRoom:number){
    let address = this.url + "presentation/chair/"+idRoom;
    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })

    };
    return this.http.get<Chair[]>(address, options);
  }
  getReservedChairsByRoom(idRoom:number, schedule: string ){
    let address = this.url + "reservation/chairs/"+idRoom;
    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      params: {schedule}

    };
    return this.http.get<ReservedChair[]>(address, options);
  }
  createReservation(reserve:newReservation): Observable<any>{

    return this.http.post<any>(this.url+'reservation',reserve);

  }
  updateReservation(reserve:newReservation):Observable<any>{
    return this.http.put<any>(this.url+'reservation',reserve);
  }
  getReservedChairByPresentationAndUser(roomId:number, schedule:string, userId:number){
    let address = this.url+"reservation/reserved_chairs"

    let options= {
      headers: new HttpHeaders({
        'Content-type': 'application/json'

      }),
         params: {
        'roomId': roomId.toString(),
        'schedule':schedule,
        'userId': userId.toString()
      }
    };

    return this.http.get<ReservedChair[]>(address, options);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking, BusSchedule, IScheduleData, Search } from '../model/model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl : string ="https://api.freeprojectapi.com/api/BusBooking/"
  private apiUrl1 = 'https://api.freeprojectapi.com/api/BusBooking/GetAvailableRoutes';
  constructor(private http : HttpClient) { }

  searchBus(fromId: string, toId: string, date:Date){
    return this.http.get(this.apiUrl+ 'searchBus2?fromLocation=' +
   fromId +
   '&toLocation=' +
   toId +
   '&travelDate=' +
   date)
  }

  getBusScheduleById(scheduleId : number) :Observable<IScheduleData>{
    return this.http.get<IScheduleData>(`${this.apiUrl}GetBusScheduleById?id=${scheduleId}`)
  }
  //PostBusBooking
  CreateBusBooking(obj:Booking){
    return this.http.post(`${this.apiUrl}PostBusBooking`,obj)
  }

  // getBookedSeats?shceduleId=2071
  getBookedSeats(scheduleId:number){
    return this.http.get(`${this.apiUrl}getBookedSeats?shceduleId=${scheduleId}`)
  }

    getBusSchedules(): Observable<BusSchedule[]> {
    return this.http.get<BusSchedule[]>(this.apiUrl1);
  }

}

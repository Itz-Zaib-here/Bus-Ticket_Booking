import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { Booking, BusBookingPassenger, IScheduleData } from '../../model/model';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-book-ticket',
  imports: [
    DatePipe,
    NgClass,
    CommonModule,
    FormsModule,
  ],
  standalone:true,
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css'
})
export class BookTicketComponent {
  activatedRoute = inject(ActivatedRoute)
  searchService = inject(SearchService)
  scheduleData!: IScheduleData;
  seatNoList:number[]=[];
  selectedSeatArray: BusBookingPassenger[] = [];
  bookTicketObj : Booking = new Booking();
  bookedSeatList:number []=[];

  constructor() {
    this.activatedRoute.params.subscribe((res:any)=>{
      debugger;
      const scheduleId = res.scheduleId;
      this.bookTicketObj.custId=10439;
      this.bookTicketObj.scheduleId = scheduleId;
      this.bookTicketObj.bookingDate=new Date();
      this.getBusDetails(scheduleId);
      this.getBookedSeates(scheduleId);
    })
  }
  getBusDetails(scheduleId:number){
    this.searchService.getBusScheduleById(scheduleId).subscribe((res:IScheduleData)=>{
      this.scheduleData=res;
      for (let index = 1; index <= this.scheduleData.totalSeats; index++) {
        this.seatNoList.push(index)
      }
    })
  }
    getBookedSeates(scheduleId:number){
    this.searchService.getBookedSeats(scheduleId).subscribe((res:any)=>{
      this.bookedSeatList=res;
      // for (let index = 1; index <= this.scheduleData.totalSeats; index++) {
      //   this.seatNoList.push(index)
      // }
    })
  }

  checkIfSeatSelected(seatNo:number){
    const check = this.selectedSeatArray.find(m=>m.seatNo == seatNo);
    if (check == undefined) {
      return false;
    }
    else{
      return true;
    }
  }
  checkIfBooked(seatNo:number){
        const check = this.bookedSeatList.find(m=>m == seatNo);
    if (check == undefined) {
      return false;
    }
    else{
      return true;
    }
  }

  onSelect(seatNo : number){
    const isExistIndex = this.selectedSeatArray.findIndex(m=>m.seatNo == seatNo);
    if (isExistIndex != -1) {
      this.selectedSeatArray.splice(isExistIndex,1)
    }
    else{
      const newPassnegerData : BusBookingPassenger={
      seatNo : seatNo,
      age:0,
      bookingId:0,
      gender:"",
      passengerId:0,
      passengerName:""
    };
    this.selectedSeatArray.push(newPassnegerData)
    }

  }

  bookTicket(){
    debugger;
    this.bookTicketObj.busBookingPassengers =this.selectedSeatArray;
    this.searchService.CreateBusBooking(this.bookTicketObj).subscribe((res:any)=>{
    alert("ticket booked success")
    })
  }
}

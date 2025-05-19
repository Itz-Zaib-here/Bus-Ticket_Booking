import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { BusSchedule, Search } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    DatePipe,
    NgFor,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  http = inject(HttpClient);
  searchService = inject(SearchService);
  router = inject(Router);
  locationList: any[] = [];
  searchObj: Search = new Search();
  busSchedules: BusSchedule[] = [];

  ngOnInit(): void {
    debugger;
    this.getAllLocations();

    this.searchService.getBusSchedules().subscribe({
      next: (data) => {
        this.busSchedules = data.reverse();
      },
    });
    const myDiv = document.getElementById('border');

    if (myDiv) {
      myDiv.onclick = this.searchBus.bind(this);
    }
  }

  getAllLocations() {
    debugger;
    this.http
      .get('https://api.freeprojectapi.com/api/BusBooking/GetBusLocations')
      .subscribe((res: any) => {
        debugger;
        this.locationList = res;
      });
  }
  searchBus() {
    const formattedDate = this.formatDate(this.searchObj.date);
    this.router.navigate([
      'search-result',
      this.searchObj.fromLocationId,
      this.searchObj.toLocationId,
      formattedDate,
    ]);
    debugger;
    //  const formattedDate = this.formatDate(this.searchObj.date);
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // exactly what backend expects
  }
}

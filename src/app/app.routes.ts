import { Routes } from '@angular/router';
import { SearchComponent } from './Pages/search/search.component';
import { SearchResultComponent } from './Pages/search-result/search-result.component';
import { BookTicketComponent } from './Pages/book-ticket/book-ticket.component';
import { MyBookingsComponent } from './Pages/my-bookings/my-bookings.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"search",
        pathMatch:"full"
    },
    {
        path:"search",
        component:SearchComponent
    },
    {
        path:"search-result/:from/:to/:date",
        component:SearchResultComponent
    },
    {
        path:"book-ticket/:scheduleId",
        component:BookTicketComponent
    },
    {
        path:"my-booking",
        component:MyBookingsComponent
    }
];

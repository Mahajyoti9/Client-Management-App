import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  
  { path: 'dashboard', component: FrontPageComponent },
  { path: 'add-client', component: CreateClientComponent },
  { path: 'add-client/:id', component: CreateClientComponent }, 
  { path: 'view-clients', component:ViewClientComponent },
  { path: 'schedule-meeting', component: ScheduleMeetingComponent },
  { path: 'schedule-meeting/:id', component: ScheduleMeetingComponent },
  { path: 'view-meeting', component: ViewMeetingsComponent },
  /*{ path: 'reports', component: ReportsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

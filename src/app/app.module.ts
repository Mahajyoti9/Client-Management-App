import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DropDownFillComponent } from './drop-down-fill/drop-down-fill.component';
import { CommonModule } from '@angular/common';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateClientComponent,
    DropDownFillComponent,
    ScheduleMeetingComponent,
    FrontPageComponent,
    ViewClientComponent,
    ViewMeetingsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { scheduleMeeting } from './schedule_Meeting';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleMeetingService {

  smUrl:string="http://localhost:3000/client";
    private meetingsSubject = new BehaviorSubject<scheduleMeeting[]>([]);
    constructor(private http:HttpClient) { }
  
    getScheduleMeeing(): Observable<scheduleMeeting[]> {
      console.log("I am getscheduleMeeting");
      return this.http.get<scheduleMeeting[]>(this.smUrl);
    }
  
    saveScheduleMeeting(schMeet: scheduleMeeting): Observable<scheduleMeeting> {
      return this.http.post<scheduleMeeting>(this.smUrl, schMeet);
    }
  
}

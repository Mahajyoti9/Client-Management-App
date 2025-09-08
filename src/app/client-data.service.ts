import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { client_data } from './client-data';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { scheduleMeeting } from './schedule_Meeting';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  apiUrl:string="http://localhost:3000/client";
  meetingUrl:string="http://localhost:3000/scheduleMeeting"
  private meetingsSubject = new BehaviorSubject<client_data[]>([]);
  constructor(private http:HttpClient) { }

  getClients(): Observable<client_data[]> {
    console.log("I am getclient");
    return this.http.get<client_data[]>(this.apiUrl);
  }

  saveClient(client: client_data): Observable<client_data> {
    return this.http.post<client_data>(this.apiUrl, client);
  }

  updateClient(id: string, client: client_data): Observable<client_data> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<client_data>(url, client);
  }

  deleteClient(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  getClientById(id: string): Observable<client_data> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<client_data>(url);
  }

   getScheduleMeeing(): Observable<scheduleMeeting[]> {
    console.log("I am getscheduleMeeting");
    return this.http.get<scheduleMeeting[]>(this.meetingUrl);
  }

  saveScheduleMeeting(schMeet: scheduleMeeting): Observable<scheduleMeeting> {
    return this.http.post<scheduleMeeting>(this.meetingUrl, schMeet);
  }
 
  updateMeeting(id: string, schMeet: scheduleMeeting): Observable<scheduleMeeting> {
    const url = `${this.meetingUrl}/${id}`;
    return this.http.put<scheduleMeeting>(url, schMeet);
  }

  deleteMeeting(id: string): Observable<any> {
    const url = `${this.meetingUrl}/${id}`;
    return this.http.delete(url);
  }

  getMeetingById(id: string): Observable<scheduleMeeting> {
    const url = `${this.meetingUrl}/${id}`;
    return this.http.get<scheduleMeeting>(url);
  }
 };


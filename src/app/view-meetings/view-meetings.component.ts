import { Component } from '@angular/core';
import { ClientDataService } from '../client-data.service';
import { scheduleMeeting } from '../schedule_Meeting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.css']
})
export class ViewMeetingsComponent {
schMeetings:scheduleMeeting[]=[];

constructor(private scheduleMeeting:ClientDataService,
            private router: Router
){}

 ngOnInit(){
    this.scheduleMeeting.getScheduleMeeing().subscribe(
      result=>this.schMeetings=result.filter(schMeetings=>schMeetings.status === 'active'));
 }

 editMeeting(id: string): void {
    if (id != null) {
      this.router.navigate(['/schedule-meeting', id]);   // ✅ This works now
    }
  }

  //delete Meeting
    deleteMeeting(id: string): void {
  if (confirm('Are you sure you want to delete this Meeting?')) {

      this.scheduleMeeting.getMeetingById(id).subscribe(client => {
      if (client) {
        client.status = 'inactive';  // 👈 Soft delete: update status

      this.scheduleMeeting.updateMeeting(id,client).subscribe(() => {
        alert('Meeting deleted successfully');
        this.scheduleMeeting.getScheduleMeeing().subscribe(result=>this.schMeetings=
          result.filter(client=>client.status === 'active')
      );
    });
  }
});
}
}
  //End Delete Meeting
}

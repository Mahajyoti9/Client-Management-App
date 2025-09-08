import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { scheduleMeeting } from '../schedule_Meeting';
import { ClientDataService } from '../client-data.service';
import { client_data } from '../client-data';
import { ScheduleMeetingService } from '../schedule-meeting.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit{
  pastDate:boolean=false;
  outsideBusinessHours:boolean=false;
  scheduleMeeting:FormGroup;
  submitted:boolean=false;
  schMeetings:scheduleMeeting[]=[];
  clients:client_data[]=[];
  isEditMode:boolean=false;
  MeetingIdToEdit!: string;

  constructor(private fb:FormBuilder, 
    private scheduleMeetingService : ClientDataService,
    private route: ActivatedRoute,
    private router: Router
  ){
   
  }
  ngOnInit(){
   
    this.scheduleMeeting=this.fb.group({
      cid:['',Validators.required],
      cname:['',Validators.required],
      date:['',[Validators.required,futureDateValidator()]],
      time:['',[Validators.required,businessHoursValidator()]],
      purpose:['',Validators.required],
    });


//to show all the clients when for is initialized
this.scheduleMeetingService.getClients().subscribe(result=>this.clients=
    result.filter(client=>client.status === 'active')
  );
    /*if (this.clients.length > 0) {
      this.scheduleMeeting.get('cname')?.setValue(this.clients[0].id);
    }*/
   if (this.clients.length > 0) {
    const firstClient = this.clients[0];

    this.scheduleMeeting.patchValue({
      cid: firstClient.id,     // 👈 Set selected client ID
      cname: firstClient.cname      // 👈 Optional: for storing/displaying name
    });
  }

    //To fetch the client to update
  const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    const id = idParam;

    // Fetch the existing client and prefill form
    this.scheduleMeetingService.getMeetingById(id).subscribe(schMeetings => {
      if (schMeetings) {
        this.isEditMode = true; // Optional flag if you want to show 'Edit' vs 'Add'
        this.MeetingIdToEdit = id;

        // ✅ Prefill form fields
        this.scheduleMeeting.patchValue({
          cid: schMeetings.cid,
          date: schMeetings.date,
          time: schMeetings.time,
          purpose: schMeetings.purpose
        });

        //console.log(this.scheduleMeeting.controls);

        // ✅ Optionally store the id if needed for update logic later
        this.MeetingIdToEdit = schMeetings.id;  // Define this property in your class
      }
  });
}

  }

  onSubmit(){

    if (this.scheduleMeeting.invalid) return;

    const formValue = this.scheduleMeeting.value;

    formValue.status="active";
    if (this.isEditMode) {
      this.scheduleMeetingService.updateMeeting(this.MeetingIdToEdit, formValue).subscribe(() => {
        alert('Meeting updated successfully!');
        this.router.navigate(['/view-meeting']);
    });
    } else {
    this.scheduleMeetingService.saveScheduleMeeting(formValue).subscribe(() => {
      alert('Meeting scheduled successfully!');
      this.router.navigate(['/view-meeting']);
    });
  }
  /*old code before adding editing feature
      if (this.scheduleMeeting.valid){
        console.log("I am in onSubmit valid of schedule meeting");
        const newSchedule: scheduleMeeting = this.scheduleMeeting.value;
        this.scheduleMeetingService.saveScheduleMeeting(newSchedule).subscribe({
        next: (response) => {
          alert("Form Submitted");
          this.scheduleMeeting.reset();
          this.submitted=true;
          this.scheduleMeetingService.getScheduleMeeing().subscribe(result=>this.schMeetings=result);
        },
        error: (err) => {
          console.error('Error saving client:', err);
          if (this.scheduleMeeting.invalid) {
            this.scheduleMeeting.markAllAsTouched();
          return;
            }
        }
      })
    }*/
  }
//code is added when id is chnged for client, name also should be changed in select control
    onClientChange(event: any): void {
      const selectedId = event.target.value;
      const selectedClient = this.clients.find(c => c.id === selectedId);
      
      if (selectedClient) {
        this.scheduleMeeting.patchValue({
          cname: selectedClient.cname
        });
      }
    }
}

function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const selectedDate = new Date(control.value);
      const today = new Date();

      // Set time to 0:0:0 to compare only date part
      today.setHours(0, 0, 0, 0);

      return selectedDate < today ? { pastDate: true } : null;
  }
};

function businessHoursValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;

    const [hour, minute] = value.split(':').map(Number);
    const totalMinutes = hour * 60 + minute;

    const start = 9 * 60;  // 9:00 AM
    const end = 17 * 60;   // 5:00 PM

    return totalMinutes < start || totalMinutes > end
      ? { outsideBusinessHours: true }
      : null;
  };

  
}


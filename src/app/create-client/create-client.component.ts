import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ClientDataService } from '../client-data.service';
import { client_data } from '../client-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  submitted:boolean=false;
  passwordMismatch:boolean=false;
  clientReg:FormGroup;
  clients:client_data[]=[];
  isEditMode:boolean=false;
  clientIdToEdit!: string;

  constructor(private fb:FormBuilder,
    private clientService:ClientDataService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.clientReg=this.fb.group({
      cname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      address:['',Validators.required],
      pass:['',[Validators.required,Validators.minLength(8)]],
      rpass:['',Validators.required]
    },{
      validators:this.passwordMatchValidator
    }
    );

  this.clientService.getClients().subscribe(result=>this.clients=
    result.filter(client=>client.status === 'active')
  );

  //To fetch the client to update
  const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    const id = idParam;

    // Fetch the existing client and prefill form
    this.clientService.getClientById(id).subscribe(client => {
      if (client) {
        this.isEditMode = true; // Optional flag if you want to show 'Edit' vs 'Add'

        // ✅ Prefill form fields
        this.clientReg.patchValue({
          cname: client.cname,
          email: client.email,
          address: client.address,
          pass: client.pass,
          rpass: client.rpass  // You can fill confirm password same as password
        });

        // ✅ Optionally store the id if needed for update logic later
        this.clientIdToEdit = client.id;  // Define this property in your class
      }
  });
}
}

  onSubmit(){
    if (this.clientReg.valid){
      const newClient: client_data = this.clientReg.value;

      if (this.isEditMode) {
    // 🟡 Update existing client
          console.log(this.clientIdToEdit);
          this.clientService.updateClient(this.clientIdToEdit, newClient).subscribe(() => {
            alert('Client updated successfully!');
            this.router.navigate(['/view-clients']);
          });
        } else {
          // 🟢 Add new client (ID will be auto-generated)
          newClient.status="active";
          this.clientService.saveClient(newClient).subscribe(() => {
            alert('Client registered successfully!');
            this.router.navigate(['/view-clients']);
            this.clientReg.reset();
            this.submitted=true;
            this.clientService.getClients().subscribe(result=>this.clients=
              result.filter(client=>client.status === 'active')
            );
          });
        }
      }
      /*error: (err) => {
        console.error('Error saving client:', err);
      }*/
    }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('pass')?.value;
    const rPassword = form.get('rpass')?.value;
    return password === rPassword ? null : { passwordMismatch: true };
  }

}


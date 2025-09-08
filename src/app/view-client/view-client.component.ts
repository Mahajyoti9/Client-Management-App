import { Component, OnInit } from '@angular/core';
import { ClientDataService } from '../client-data.service';
import { client_data } from '../client-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit{
  clients:client_data[]=[];

  constructor(
      private clientService:ClientDataService,
      private router: Router
  ){}

  ngOnInit(){
    //this.clientService.getClients().subscribe(result=>this.clients=result);
    this.clientService.getClients().subscribe(result=>this.clients=
      result.filter(client=>client.status === 'active')
    );
  }

  editClient(id: string): void {
    if (id != null) {
      this.router.navigate(['/add-client', id]);   // ✅ This works now
    }
  }

  deleteClient(id: string): void {
  if (confirm('Are you sure you want to delete this client?')) {

      this.clientService.getClientById(id).subscribe(client => {
      if (client) {
        client.status = 'inactive';  // 👈 Soft delete: update status

      this.clientService.updateClient(id,client).subscribe(() => {
        alert('Client deleted successfully');
        this.clientService.getClients().subscribe(result=>this.clients=
          result.filter(client=>client.status === 'active')
      );
    });
  }
});
}
}
}

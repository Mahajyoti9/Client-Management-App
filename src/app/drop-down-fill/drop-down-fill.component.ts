import { Component } from '@angular/core';
import { ClientDataService } from '../client-data.service';
import { client_data } from '../client-data';

@Component({
  selector: 'app-drop-down-fill',
  templateUrl: './drop-down-fill.component.html',
  styleUrls: ['./drop-down-fill.component.css']
})
export class DropDownFillComponent {
  clients: client_data[]=[];

  constructor(private clientService: ClientDataService) {}

   ngOnInit(){
    this.clientService.getClients().subscribe(result=>this.clients=
      result.filter(client=>client.status === 'active')
    );
    }  

}

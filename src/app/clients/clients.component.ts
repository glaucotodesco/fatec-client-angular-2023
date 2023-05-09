import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];

  formGroupClient: FormGroup;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group(
      {
        id: [''],
        name: [''],
        email: ['']
      }
    );
  }

  ngOnInit(): void {
    this.loadClients();
  }


  save(){
    if(this.formGroupClient.valid){
      this.clientService.save(this.formGroupClient.value).subscribe(
        {
           next: (client) => {
              this.clients.push(client);
              this.formGroupClient.reset();
           }
        }
      )
    }
  }
  loadClients() {
    this.clientService.getClients().subscribe(
      {
        next: data => this.clients = data,
        error: msg => console.log("Erro ao chamar o endpont " + msg)
      }
    )
  }

}









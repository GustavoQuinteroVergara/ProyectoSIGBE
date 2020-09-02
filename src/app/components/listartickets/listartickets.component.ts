import { Component, OnInit } from '@angular/core';
import {ServicesticketsService} from './serviciolistarticket.service';

@Component({
  selector: 'app-listartickets',
  templateUrl: './listartickets.component.html',
  styleUrls: ['./listartickets.component.css']
})
export class ListarticketsComponent {

  constructor(private servitickets: ServicesticketsService) { }
ticketes:any;

 buscartickets(identificacion:any){
   this.servitickets.buscartickets(identificacion).subscribe(result =>{ 
    console.log(result);
    this.ticketes=result;
  });
    console.log(this.ticketes);

}
}
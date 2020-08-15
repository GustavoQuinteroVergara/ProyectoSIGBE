import { Component, OnInit } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css']
})
export class ModificarusuarioComponent implements OnInit {

  constructor(matslider: MatSliderModule) { }

  ngOnInit(): void {
  }

}

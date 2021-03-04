import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import html2canvas from "html2canvas";

@Component({
	selector: 'app-listicketest',
	templateUrl: './listicketest.component.html',
	styleUrls: ['./listicketest.component.css']
})
export class ListicketestComponent implements OnInit {

	listatickets:any;

	$nombreusuario= JSON.parse(localStorage.getItem('currentUser'));

	imgcreada = false;

	imagenCreada;
	public concecutivosel: string = null;

	public qrdata: string = null;
	public elementType: 'img' | 'url' | 'canvas' | 'svg' = null;
	public level: 'L' | 'M' | 'Q' | 'H';
	public scale: number;
	public width: number;

	constructor(public ticketService:TicketService,
		public dialog: MatDialog) {
		this.buscarTicketEst();
		this.elementType = 'img';
		this.level = 'M';
		this.qrdata = 'Initial QR code data string';
		this.scale = 1;
		this.width = 256;
	}

	ngOnInit(): void {
	}

	buscarTicketEst(){
		this.ticketService.listTicketByest(this.$nombreusuario.identi).subscribe(result=>{
			this.listatickets = result;
		},(err)=>{
			console.log("error sin tickets");
			this.listatickets = null;
		});
	}

	crearImagen() {
		html2canvas(document.querySelector("#imgqr")).then(canvas => {

			this.imagenCreada = canvas.toDataURL();      

		});
		this.imgcreada = true;
	}

	verQr(templateRef,concecutivo:any){
		this.imgcreada = false;
		this.concecutivosel = "" +  concecutivo + "";
		let dialogRef = this.dialog.open( templateRef,{
			height: '480px',
			width: '350px',
		});
	}

}

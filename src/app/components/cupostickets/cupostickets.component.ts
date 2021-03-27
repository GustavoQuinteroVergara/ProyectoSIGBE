import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CuposasignacionService} from '../../services/cuposasignacion.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-cupostickets',
	templateUrl: './cupostickets.component.html',
	styleUrls: ['./cupostickets.component.css']
})
export class CuposticketsComponent implements OnInit {

	cuposAsignacionarray:any;
	success:any;
	asignacionesBuscadas:any;
	dataSource: MatTableDataSource<any>;
	fechaActual= formatDate(new Date(), 'yyyy-MM-dd', 'en');
	displayedColumns: string[] = ['consecutivo_cupostickets', 
    'fechaasignacion', 'cuposdisponiblesalmuerzo', 
    'cuposdisponiblesrefrigerio','Acciones'];
	public formularioCuposAsigna: FormGroup;

	@ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort,{static: false}) sort: MatSort;
	constructor(private serviceCuposasign:CuposasignacionService,public dialog: MatDialog) { }

	ngOnInit(): void {
		this.buscarAsignaciones();
		this.formularioCuposAsigna = new FormGroup({
			cuposAlmuerzo: new FormControl('',Validators.required),
			cuposRefrigerio: new FormControl('',Validators.required),
		});
		
	}
	public hasError = (controlName: string, errorName: string) =>{
		return this.formularioCuposAsigna.controls[controlName].hasError(errorName);
	}

	registrarAsignacion(fecha:any,cuposalmuerzo:any,cuposrefrigerio:any){
		this.cuposAsignacionarray= {fecha:fecha,cuposalmuerzo:cuposalmuerzo,cuposrefrigerio:cuposrefrigerio};
		this.serviceCuposasign.registrarAsignacionCupos(this.cuposAsignacionarray).subscribe(res =>{
			
			Swal.fire({
	          title: 'Exitoso',
	          text: 'Registrado exitosamente.',
	          icon: 'success'
	        });
			this.buscarAsignaciones();


		},(err)=>{
			Swal.fire({
	          title: 'ERROR',
	          text: 'Error al registrar.' + err.error.text,
	          icon: 'error'
	        });
		});

	}

	buscarAsignaciones(){
		this.serviceCuposasign.buscarAsignaciones().subscribe(res=>{
			this.asignacionesBuscadas=res;
			this.dataSource = new MatTableDataSource(this.asignacionesBuscadas);
		    this.dataSource.paginator = this.paginator;
		    this.dataSource.sort = this.sort;
		    this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
		    console.log(this.dataSource);
		});
	}

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CuposasignacionService} from '../../services/cuposasignacion.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {formatDate } from '@angular/common';

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

	registrarAsignacion(fecha:any,cuposalmuerzo:any,cuposrefrigerio:any,templateRef){
		this.cuposAsignacionarray= {fecha:fecha,cuposalmuerzo:cuposalmuerzo,cuposrefrigerio:cuposrefrigerio};
		this.serviceCuposasign.registrarAsignacionCupos(this.cuposAsignacionarray).subscribe(res =>{
			this.success = true;
			let dialogRef = this.dialog.open( templateRef,{
				height: '200px',
				width: '200px',
			});
			this.buscarAsignaciones();
			console.log(res);


		},(err)=>{
			this.success = false;
			let dialogRef = this.dialog.open( templateRef,{
				height: '200px',
				width: '200px',
			});

			console.log('ERROR: ' + err.error.text);
		});
		console.log(this.cuposAsignacionarray);

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

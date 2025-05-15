import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-empleados',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './empleados.component.html',
	styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
	empleados: any[] = [];
	empleadosPaginados: any[] = [];
	pagina: number = 1;
	limite: number = 5;
	totalPaginas: number = 1;

	cargando = true;
	datosCargados = false;

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get<any[]>('http://localhost:3000/empleados').subscribe(data => {
		this.empleados = data;
		this.totalPaginas = Math.ceil(this.empleados.length / this.limite) || 1;
		this.cargando = false;
		this.datosCargados = true;
		this.actualizarPaginacion();
		}, error => {
		this.cargando = false;
		this.datosCargados = true;
		this.empleados = [];
		});
	}

	cambiarPagina(nuevaPagina: number) {
		if (nuevaPagina < 1 || nuevaPagina > this.totalPaginas) return;
		this.pagina = nuevaPagina;
		this.actualizarPaginacion();
	}

	actualizarPaginacion() {
		const inicio = (this.pagina - 1) * this.limite;
		const fin = inicio + this.limite;
		this.empleadosPaginados = this.empleados.slice(inicio, fin);
	}
}
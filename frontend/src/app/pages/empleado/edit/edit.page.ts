import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmpleadoFormComponent } from '../../../components/empleados/form/form.component';

@Component({
    selector: 'app-empleado-edit-page',
    standalone: true,
    imports: [CommonModule, EmpleadoFormComponent],
    templateUrl: './edit.page.html'
})
export class EmpleadoEditPage implements OnInit {
    empleadoId: string = '';
    empleadoData: any = null;
    cargando = true;
    eliminando = false;

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.empleadoId = this.route.snapshot.paramMap.get('id') || '';
        this.http.get(`http://localhost:3000/empleados/edit/${this.empleadoId}`).subscribe({
        next: (data) => {
            this.empleadoData = data;
            this.cargando = false;
        },
        error: (err) => {
            console.error('Error al cargar empleado:', err);
            this.cargando = false;
            this.router.navigate(['/empleados/list'], {
                queryParams: { mensaje: 'Empleado no encontrado' }
            });
        }
        });
    }

    actualizarEmpleado(data: any) {
        this.http.put(`http://localhost:3000/empleados/update/${this.empleadoId}`, data).subscribe({
            next: () => this.router.navigate(['/empleados/list']),
            error: err => console.error('Error al actualizar empleado:', err)
        });
    }

    eliminarEmpleado(): void {
        this.http.delete(`http://localhost:3000/empleados/delete/${this.empleadoId}`).subscribe({
            next: () => {
                this.router.navigate(['/empleados/list'], {
                    queryParams: { mensaje: 'Empleado eliminado correctamente' }
                });
            },
            error: err => {
                console.error('Error al eliminar empleado:', err);
            }
        });
    }
}

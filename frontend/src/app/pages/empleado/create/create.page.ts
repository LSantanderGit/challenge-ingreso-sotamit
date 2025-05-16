import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoFormComponent } from '../../../components/empleados/form/form.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-empleado-create-page',
    standalone: true,
    imports: [CommonModule, EmpleadoFormComponent],
    templateUrl: './create.page.html'
})
export class EmpleadoCreatePage {
    constructor(private http: HttpClient, private router: Router) {}

    guardarEmpleado(data: any) {
        this.http.post('http://localhost:3000/empleados/save', data).subscribe({
        next: () => this.router.navigate(['/empleados/list']),
        error: err => console.error('Error al guardar empleado:', err)
        });
    }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AreaFormComponent } from '../../../components/area/form/form.component';

@Component({
    selector: 'app-area-create-page',
    standalone: true,
    imports: [CommonModule, AreaFormComponent],
    templateUrl: './create.page.html'
})
export class AreaCreatePage {
    constructor(private http: HttpClient, private router: Router) {}

    guardarArea(data: any): void {
        this.http.post('http://localhost:3000/area/save', data).subscribe({
        next: () => {
            this.router.navigate(['/empleados/list'], {
            queryParams: { mensaje: 'Área creada correctamente' }
            });
        },
        error: (err) => {
            console.error('Error al crear área:', err);
            alert('Hubo un error al crear el área.');
        }
        });
    }
}

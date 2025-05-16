import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosListComponent } from '../../../components/empleados/list/list.component';

@Component({
    selector: 'app-empleado-list-page',
    standalone: true,
    imports: [CommonModule, EmpleadosListComponent],
    templateUrl: './list.page.html'
})
export class EmpleadosListPage {}
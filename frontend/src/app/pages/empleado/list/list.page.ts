import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosListComponent } from '../../../components/empleados/list/list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-empleado-list-page',
    standalone: true,
    imports: [CommonModule, EmpleadosListComponent],
    templateUrl: './list.page.html'
})
export class EmpleadosListPage {
    mensajeFlash: string | null = null;
    fadeClass = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
        if (params['mensaje']) {
            this.mensajeFlash = params['mensaje'];
            this.fadeClass = '';
    
            setTimeout(() => this.fadeClass = 'fade-out', 3000);
            setTimeout(() => this.mensajeFlash = null, 4000);
        }
        });
    }
}
import { Routes } from '@angular/router';
import { EmpleadosListPage } from './pages/empleado/list/list.page';
import { EmpleadoCreatePage } from './pages/empleado/create/create.page';
import { EmpleadoEditPage } from './pages/empleado/edit/edit.page';
import { AreaCreatePage } from './pages/area/create/create.page';

export const routes: Routes = [
	{ path: 'empleados/list', component: EmpleadosListPage },
	{ path: 'empleados/create', component: EmpleadoCreatePage },
	{ path: 'empleados/edit/:id', component: EmpleadoEditPage },
	{ path: 'area/create', component: AreaCreatePage },
	{ path: '', redirectTo: 'empleados/list', pathMatch: 'full' },
	{ path: '**', redirectTo: 'empleados/list' }
];

export class AppRoutingModule { }

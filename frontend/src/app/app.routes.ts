import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosListPage } from './pages/empleado/list/list.page'; // nuevo

export const routes: Routes = [
	{ path: 'empleados/list', component: EmpleadosListPage },
	{ path: '', redirectTo: 'empleados/list', pathMatch: 'full' },
	{ path: '**', redirectTo: 'empleados/list' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

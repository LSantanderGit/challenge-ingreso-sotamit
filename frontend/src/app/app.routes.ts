import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './pages/empleados/empleados.component';

export const routes: Routes = [
	{ path: 'empleados', component: EmpleadosComponent },
	{ path: '', redirectTo: 'empleados', pathMatch: 'full' },
	{ path: '**', redirectTo: 'empleados' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

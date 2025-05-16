import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-area-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form.component.html'
})
export class AreaFormComponent {
    @Output() onSubmit = new EventEmitter<any>();

    form: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
        this.form = this.fb.group({
            nombre: ['', Validators.required]
        });
    }

    submit(): void {
        if (this.form.valid) {
            this.onSubmit.emit(this.form.value);
        } else {
            this.form.markAllAsTouched();
        }
    }

    volver(): void {
        this.router.navigate(['/empleados/list']);
    }
}

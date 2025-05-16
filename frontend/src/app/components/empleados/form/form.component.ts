import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class EmpleadoFormComponent implements OnInit, OnChanges {
  @Input() initialData: any = null;
  @Input() readonly: boolean = false;
  @Output() onSubmit = new EventEmitter<any>();

  form: FormGroup;
  areas: any[] = [];
  hoy: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      nombreCompleto: ['', Validators.required],
      documento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      esDesarrollador: [false],
      descripcion: [''],
      areaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const hoyDate = new Date();
    this.hoy = hoyDate.toISOString().split('T')[0];

    this.http.get<any[]>('http://localhost:3000/empleados/getAreas').subscribe(data => {
      this.areas = data;
    });

    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }

    if (this.readonly) {
      this.form.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && changes['initialData'].currentValue) {
      this.form.patchValue(changes['initialData'].currentValue);
    }

    if (changes['readonly']) {
      if (this.readonly) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  submit(): void {
    if (this.readonly) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.onSubmit.emit(this.form.value);
  }
}

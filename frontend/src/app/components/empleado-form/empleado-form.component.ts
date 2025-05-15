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

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit, OnChanges {
  @Input() initialData: any = null;
  @Input() readonly: boolean = false;
  @Output() onSubmit = new EventEmitter<any>();

  form: FormGroup;
  areas: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      nombreCompleto: [''],
      documento: [''],
      fechaNacimiento: [''],
      esDesarrollador: [false],
      descripcion: [''],
      areaId: ['']
    });
  }

  ngOnInit(): void {
    // Cargar áreas
    this.http.get<any[]>('http://localhost:3000/areas').subscribe(data => {
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
    if (this.form.valid && !this.readonly) {
      this.onSubmit.emit(this.form.value);
    }
  }
}

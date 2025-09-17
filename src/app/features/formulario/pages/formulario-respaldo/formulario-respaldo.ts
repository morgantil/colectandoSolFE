import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-formulario-respaldo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
  <div class="container">
    <h1 class="section-title">Formulario de Respaldo</h1>

    <div class="card">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <!-- Fecha -->
        <div class="row">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Fecha</mat-label>
            <input matInput [matDatepicker]="picker" placeholder="Seleccionar fecha" formControlName="fecha" required>
            <mat-datepicker #picker></mat-datepicker>
            <mat-icon matSuffix>event</mat-icon>
            <mat-error *ngIf="form.get('fecha')?.hasError('required')">La fecha es requerida</mat-error>
          </mat-form-field>
        </div>

        <!-- Descripción -->
        <div class="row">
          <div class="full">
            <label class="section-title">Descripción</label>
            <p class="hint">Indicar el resultado de la acción. Solo una opción es posible.</p>
            <div class="checkbox-list">
              <mat-checkbox
                *ngFor="let opt of descripcionOpciones"
                [checked]="form.value.descripcion === opt"
                (change)="onDescripcionChange(opt, $event.checked)">
                {{ opt }}
              </mat-checkbox>
            </div>
            <div class="error" *ngIf="descripcionInvalida">Debe seleccionar una (1) opción</div>
          </div>
        </div>

        <!-- Correo Relevado -->
        <div class="row">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Correo Relevado</mat-label>
            <input matInput type="email" placeholder="correo@dominio.com" formControlName="correo">
            <mat-hint>Si no hay correo, deje vacío.</mat-hint>
            <mat-error *ngIf="form.get('correo')?.hasError('email')">Formato de correo inválido</mat-error>
          </mat-form-field>
        </div>

        <!-- Teléfono Relevado -->
        <div class="row">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Teléfono Relevado</mat-label>
            <input matInput type="tel" placeholder="Solo números" formControlName="telefono" maxlength="20">
            <mat-hint>Si no hay teléfono, deje vacío.</mat-hint>
            <mat-error *ngIf="form.get('telefono')?.hasError('pattern')">Solo números y + permitido</mat-error>
          </mat-form-field>
        </div>

        <!-- Observaciones -->
        <div class="row">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Observaciones</mat-label>
            <textarea matInput rows="4" formControlName="observaciones" maxlength="400" placeholder="Detalle aquí cualquier comentario relevante"></textarea>
            <mat-hint align="end">{{ (form.get('observaciones')?.value?.length || 0) }}/400</mat-hint>
          </mat-form-field>
        </div>

        <!-- Respaldo: archivo -->
        <div class="row">
          <div class="full">
            <label class="section-title">Respaldo</label>
            <p class="hint">Cargar un archivo de respaldo. Solo un archivo. El nombre debe cumplir las reglas.</p>
            <input type="file" (change)="onFileSelected($event)" />
            <div class="file-info" *ngIf="archivoNombre">Archivo seleccionado: <strong>{{ archivoNombre }}</strong></div>
            <div class="error" *ngIf="archivoError">{{ archivoError }}</div>
          </div>
        </div>

        <!-- El respaldo se encuentra -->
        <div class="row">
          <div class="full">
            <label class="section-title">El respaldo se encuentra</label>
            <div class="checkbox-list">
              <mat-checkbox [checked]="form.value.enBase === true" (change)="onEnBaseChange(true, $event.checked)">Dentro de la Base</mat-checkbox>
              <mat-checkbox [checked]="form.value.enBase === false" (change)="onEnBaseChange(false, $event.checked)">Fuera de la Base</mat-checkbox>
            </div>
          </div>
        </div>

        <!-- Campos adicionales si es Fuera de la Base -->
        <div class="row" *ngIf="form.value.enBase === false">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Nombre y apellido del cliente</mat-label>
            <input matInput formControlName="nombreApellido">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Número de Documento</mat-label>
            <input matInput formControlName="documento" maxlength="20">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Dirección</mat-label>
            <input matInput formControlName="direccion">
          </mat-form-field>
          <mat-form-field appearance="outline" class="half">
            <mat-label>Entre Calle 1</mat-label>
            <input matInput formControlName="entreCalle1">
          </mat-form-field>
          <mat-form-field appearance="outline" class="half">
            <mat-label>Entre Calle 2</mat-label>
            <input matInput formControlName="entreCalle2">
          </mat-form-field>
          <mat-form-field appearance="outline" class="half">
            <mat-label>Piso</mat-label>
            <input matInput formControlName="piso">
          </mat-form-field>
          <mat-form-field appearance="outline" class="half">
            <mat-label>Departamento</mat-label>
            <input matInput formControlName="departamento">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Referencia</mat-label>
            <input matInput formControlName="referencia">
          </mat-form-field>
        </div>

        <!-- Botones -->
        <div class="actions">
          <button mat-flat-button color="primary" type="submit" [disabled]="!puedeEnviar">Enviar</button>
          <button mat-stroked-button type="button" (click)="onLimpiar()">Limpiar</button>
        </div>
      </form>
    </div>
  </div>
  `,
  styles: `
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .full { grid-column: 1 / -1; }
    .half { grid-column: span 1; }
    .checkbox-list { display: grid; gap: 6px; }
    .actions { display: flex; gap: 12px; margin-top: 16px; }
    .hint { color: rgba(0,0,0,0.6); margin: 4px 0 8px; font-size: 0.85rem; }
    .error { color: #b00020; margin-top: 6px; font-size: 0.85rem; }
    .file-info { margin-top: 6px; font-size: 0.9rem; }
    @media (max-width: 600px) {
      .row { grid-template-columns: 1fr; }
      .half { grid-column: 1 / -1; }
    }
  `
})
export class FormularioRespaldo {
  descripcionOpciones: string[] = [
    'Cliente no Capacitado - Cliente Ausente: El cliente no estaba',
    'Cliente no Capacitado - No se Ubica: Usar esto cuando al ver al cliente no se encuentra el medidor',
    'Cliente Capacitado - Capacitación',
    'Cliente Capacitado - Contrato',
    'Cliente Capacitado - Llamado',
    'Cliente Capacitado - Vivienda en Construcción',
    'Cliente no Capacitado - Cliente Ausente',
    'Cliente no Capacitado - No se Ubica',
    'Cliente no Capacitado - Vivienda Deshabitada',
    'Cliente no Capacitado – Vivienda en Construcción',
    'Cliente no Capacitado – No Quiso Firmar',
    'Cliente no Capacitado – No Quiso Atender',
  ];

  form: FormGroup;
  archivoNombre: string | null = null;
  archivoError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fecha: new FormControl<Date | null>(null, { validators: [Validators.required] }),
      descripcion: new FormControl<string | null>(null, { validators: [Validators.required] }),
      correo: new FormControl<string | null>(null, { validators: [Validators.email] }),
      telefono: new FormControl<string | null>(null, { validators: [Validators.pattern(/^[+]?\d+$/)] }),
      observaciones: new FormControl<string | null>(null, { validators: [Validators.maxLength(400)] }),
      // true: Dentro de la Base, false: Fuera de la Base, null: no seleccionado
      enBase: new FormControl<boolean | null>(null),

      // Sólo se utilizan si enBase === false
      nombreApellido: new FormControl<string | null>(null),
      documento: new FormControl<string | null>(null),
      direccion: new FormControl<string | null>(null),
      entreCalle1: new FormControl<string | null>(null),
      entreCalle2: new FormControl<string | null>(null),
      piso: new FormControl<string | null>(null),
      departamento: new FormControl<string | null>(null),
      referencia: new FormControl<string | null>(null),
    });
  }

  get descripcionInvalida(): boolean {
    return !this.form.value.descripcion && (this.form.touched || this.form.dirty);
  }

  get puedeEnviar(): boolean {
    // Solo habilitar enviar cuando "Dentro de la Base" esté seleccionado
    // o cuando "Fuera de la Base" con campos adicionales completos.
    const enBase = this.form.value.enBase;
    const requisitosMinimos = (this.form.get('fecha')?.valid ?? false) && !!this.form.value.descripcion;
    const archivoOk = !this.archivoError; // si hay error, deshabilitar

    if (!requisitosMinimos || !archivoOk) return false;

    if (enBase === true) {
      return true;
    }

    if (enBase === false) {
      // Validar campos adicionales requeridos cuando está fuera de base
      const req = [
        'nombreApellido',
        'documento',
        'direccion',
        'entreCalle1',
        'entreCalle2',
      ];
      const allFilled = req.every(k => {
        const v = (this.form.get(k)?.value ?? '').toString().trim();
        return v.length > 0;
      });
      return allFilled;
    }

    return false;
  }

  onDescripcionChange(opt: string, checked: boolean) {
    if (checked) {
      // Selección única: marcar esta y desmarcar el resto
      this.form.patchValue({ descripcion: opt });
    } else {
      // Si desmarca la seleccionada, dejar null
      if (this.form.value.descripcion === opt) {
        this.form.patchValue({ descripcion: null });
      }
    }
  }

  onEnBaseChange(valor: boolean, checked: boolean) {
    if (checked) {
      this.form.patchValue({ enBase: valor });
    } else {
      // si desmarca, volver a null sólo si es el actual
      if (this.form.value.enBase === valor) {
        this.form.patchValue({ enBase: null });
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.archivoNombre = null;
      return;
    }
    const file = input.files[0];
    this.archivoNombre = file.name;
    this.archivoError = null;

    // Validación de nombre según descripción seleccionada
    const desc = (this.form.value.descripcion || '').toLowerCase();
    if (desc.includes('capacitación')) {
      // Debe ser número de medidor sin espacios/guiones/puntos
      if (!/^\d+$/.test(file.name.split('.')[0])) {
        this.archivoError = 'Para CAPACITACIÓN: el nombre del archivo debe ser el número de medidor (solo dígitos, sin espacios, guiones ni puntos).';
      }
    }
    if (desc.includes('contrato')) {
      // Debe ser DNI sin espacios/guiones/puntos; permite sufijos A, B, C...
      if (!/^\d+[A-Za-z]?$/.test(file.name.split('.')[0])) {
        this.archivoError = 'Para CONTRATO: el nombre del archivo debe ser el DNI de quien firma. Si hay múltiples, agregar A, B, C...';
      }
    }
  }

  onSubmit() {
    if (!this.puedeEnviar) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = { ...this.form.value, archivoNombre: this.archivoNombre };
    // Imprimir por consola toda la información del formulario
    console.log('Formulario enviado:', payload);
    alert('Información enviada. Revise la consola del navegador.');
  }

  onLimpiar() {
    this.form.reset();
    this.archivoNombre = null;
    this.archivoError = null;
  }
}

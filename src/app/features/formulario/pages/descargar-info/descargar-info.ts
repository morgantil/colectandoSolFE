import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormularioService } from '../../../../formulario.service';

@Component({
  selector: 'app-descargar-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="container">
      <!-- Logos -->
      <div class="logo-container">
        <img class="logo" src="assets/edenor-logo.jpg" alt="Logo Edenor">
        <img class="logo" src="https://colectandosol.co/wp-content/uploads/2016/03/logo-colectandosol-negro-e1458937808521.png" alt="Logo ColectandoSol">
      </div>

      <h1 class="main-title">Descargar Información</h1>

      <mat-card class="form-card">
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onDescargar()" novalidate>
            <div class="section">
              <h2 class="section-title">Seleccionar Rango de Fechas</h2>
              
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Fecha Desde</mat-label>
                  <input matInput [matDatepicker]="fechaDesdePicker" placeholder="Fecha Desde" formControlName="fechaDesde" required>
                  <mat-datepicker-toggle matSuffix [for]="fechaDesdePicker"></mat-datepicker-toggle>
                  <mat-datepicker #fechaDesdePicker [touchUi]="true"></mat-datepicker>
                  <mat-error *ngIf="shouldShow('fechaDesde','required')">Fecha desde es requerida</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Fecha Hasta</mat-label>
                  <input matInput [matDatepicker]="fechaHastaPicker" placeholder="Fecha Hasta" formControlName="fechaHasta" required>
                  <mat-datepicker-toggle matSuffix [for]="fechaHastaPicker"></mat-datepicker-toggle>
                  <mat-datepicker #fechaHastaPicker [touchUi]="true"></mat-datepicker>
                  <mat-error *ngIf="shouldShow('fechaHasta','required')">Fecha hasta es requerida</mat-error>
                </mat-form-field>
              </div>
            </div>

            <!-- Botones -->
            <div class="actions">
              <button mat-flat-button color="primary" type="submit" [disabled]="!form.valid || descargando">
                <mat-spinner *ngIf="descargando" diameter="20" class="button-spinner"></mat-spinner>
                <mat-icon *ngIf="!descargando">download</mat-icon>
                {{ descargando ? 'Descargando...' : 'Descargar' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Overlay de carga -->
      <div class="overlay" *ngIf="descargando">
        <mat-spinner diameter="50"></mat-spinner>
        <div class="overlay-message">Descargando archivo...</div>
      </div>
    </div>
  `,
  styles: `
    /* Snackbars */
    :host ::ng-deep .success-snackbar {
      background: #2e7d32;
      color: #fff;
      letter-spacing: .2px;
    }

    :host ::ng-deep .error-snackbar {
      background: #c62828;
      color: #fff;
      letter-spacing: .2px;
    }

    :host ::ng-deep .success-snackbar .mat-simple-snack-bar-action,
    :host ::ng-deep .error-snackbar .mat-simple-snack-bar-action {
      color: #fff;
      font-weight: 600;
      text-transform: uppercase;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .logo {
      max-height: 80px;
      max-width: 200px;
      object-fit: contain;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    }

    .main-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 300;
      color: #2c3e50;
      margin-bottom: 30px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-card {
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border-radius: 16px;
      overflow: hidden;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      max-width: 600px;
      margin: 0 auto;
    }

    .section {
      margin-bottom: 30px;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: #34495e;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #3498db;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-field {
      width: 100%;
    }

    .actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;
      padding-top: 20px;
    }

    .button-spinner {
      margin-right: 8px;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .overlay-message {
      color: white;
      font-size: 1.2rem;
      margin-top: 20px;
      text-align: center;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }

      .logo-container {
        gap: 15px;
      }

      .logo {
        max-height: 60px;
        max-width: 150px;
      }

      .main-title {
        font-size: 2rem;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .actions {
        flex-direction: column;
        align-items: center;
      }

      .actions button {
        width: 100%;
        max-width: 300px;
      }
    }

    @media (max-width: 480px) {
      .main-title {
        font-size: 1.5rem;
      }

      .section-title {
        font-size: 1.2rem;
      }
    }
  `
})
export class DescargarInfo {
  form: FormGroup;
  descargando: boolean = false;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private formularioService: FormularioService
  ) {
    this.form = this.fb.group({
      fechaDesde: new FormControl<Date | null>(null, { validators: [Validators.required] }),
      fechaHasta: new FormControl<Date | null>(new Date(), { validators: [Validators.required] }),
    });
  }

  shouldShow(controlName: string, error?: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false;
    const hasError = error ? control.hasError(error) : control.invalid;
    return (control.touched || this.submitted) && hasError;
  }

  onDescargar() {
    this.submitted = true;

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, complete ambas fechas', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Validar que fechaDesde sea menor o igual a fechaHasta
    const fechaDesde = this.form.get('fechaDesde')?.value;
    const fechaHasta = this.form.get('fechaHasta')?.value;

    if (fechaDesde && fechaHasta && fechaDesde > fechaHasta) {
      this.snackBar.open('La fecha desde debe ser menor o igual a la fecha hasta', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.descargando = true;
    this.submitted = false;

    // Formatear fechas como YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const startDate = formatDate(fechaDesde);
    const endDate = formatDate(fechaHasta);

    this.formularioService.descargarExcel(startDate, endDate).subscribe({
      next: (blob: Blob) => {
        this.descargando = false;
        // Crear un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `formularios_${startDate}_${endDate}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        this.snackBar.open('Archivo descargado exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err: any) => {
        console.error('Error al descargar:', err);
        this.descargando = false;
        const mensaje = err?.status
          ? `Error ${err.status}: No se pudo descargar el archivo.`
          : 'Error de conexión. Verifique su red e intente nuevamente.';
        this.snackBar.open(mensaje, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}


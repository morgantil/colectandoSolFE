import { Component, ElementRef, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormularioService } from '../../../../formulario.service';

@Component({
  selector: 'app-resultado-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule],
  template: `
    <div class="dialog-modern" [class.success]="data.type === 'success'" [class.error]="data.type === 'error'">
      <div class="dialog-modern-header">
        <ng-container *ngIf="data.type === 'success'; else errorIcon">
          <mat-icon class="dialog-modern-icon" color="primary">check_circle</mat-icon>
        </ng-container>
        <ng-template #errorIcon>
          <mat-icon class="dialog-modern-icon" color="warn">error</mat-icon>
        </ng-template>
      </div>
      <div class="dialog-modern-content">
        <h2 class="dialog-modern-title">{{ data.title }}</h2>
        <div class="dialog-modern-message">{{ data.message }}</div>
      </div>
      <div class="dialog-modern-actions">
        <button mat-flat-button color="primary" (click)="close()">Aceptar</button>
      </div>
    </div>
  `,
  styles: `
    .dialog-modern {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 36px 28px 24px 28px;
      border-radius: 22px;
      background: #fff;
      max-width: 96vw;
      min-width: 300px;
      box-shadow: 0 6px 30px rgba(44,62,80,0.18);
      position: relative;
      overflow: hidden;
    }
    .dialog-modern-header {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-bottom: 8px;
    }
    .dialog-modern-icon {
      font-size: 70px;
      margin-bottom: 0px;
      margin-top: 0;
      /* Mejor centrado y sin recorte */
      box-sizing: content-box;
    }
    .dialog-modern-title {
      font-weight: 600;
      color: #24292f;
      margin: 12px 0 7px;
      font-size: 1.5rem;
      text-align: center;
    }
    .dialog-modern-message {
      font-size: 1.075rem;
      color: #49515d;
      text-align: center;
      margin-bottom: 12px;
    }
    .dialog-modern-actions {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-top: 24px;
    }
    .success .dialog-modern-header .dialog-modern-icon {
      color: #38cb89;
      background: linear-gradient(145deg,#e1f7e7,#b4edd2 60%);
      border-radius: 50%;
    }
    .error .dialog-modern-header .dialog-modern-icon {
      color: #f3666c;
      background: linear-gradient(145deg,#f9dedf 60%,#f7dbec);
      border-radius: 50%;
    }
    @media (max-width: 500px) {
      .dialog-modern {
        min-width: 0;
        padding: 18px 6px 16px 6px;
      }
      .dialog-modern-title { font-size: 1.1rem; }
      .dialog-modern-icon { font-size: 50px; }
    }
  `
})
export class ResultadoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; type: 'success' | 'error' },
    private dialogRef: MatDialogRef<ResultadoDialogComponent>
  ) {}

  close() {
    this.dialogRef.close(true);
  }
}

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
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  template: `
    <div class="container">
      <!-- Logos -->
      <div class="logo-container">
        <img class="logo" src="assets/edenor-logo.jpg" alt="Logo Edenor">
        <img class="logo" src="https://colectandosol.co/wp-content/uploads/2016/03/logo-colectandosol-negro-e1458937808521.png" alt="Logo ColectandoSol">
      </div>

      <h1 class="main-title">Capacitación Energética</h1>

      <mat-card class="form-card">
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            
            <!-- Información del Cliente -->
            <div class="section">
              <h2 class="section-title">Información del Cliente</h2>
              
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>ID de Cuenta</mat-label>
                  <input matInput formControlName="idCuenta" placeholder="ID de Cuenta" required>
                <mat-error *ngIf="shouldShow('idCuenta','required')">ID de Cuenta es requerido</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Número de Medidor</mat-label>
                  <input matInput formControlName="numeroMedidor" placeholder="Número de Medidor" required>
                <mat-error *ngIf="shouldShow('numeroMedidor','required')">Número de Medidor es requerido</mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Nombre del Titular</mat-label>
                  <input matInput formControlName="nombreTitular" placeholder="Nombre del Titular" required>
                <mat-error *ngIf="shouldShow('nombreTitular','required')">Nombre del Titular es requerido</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>DNI</mat-label>
                  <input matInput formControlName="dni" placeholder="DNI" required>
                <mat-error *ngIf="shouldShow('dni','required')">DNI es requerido</mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Dirección</mat-label>
                  <input matInput formControlName="direccion" placeholder="Dirección">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Fecha de Nacimiento</mat-label>
                  <input matInput [matDatepicker]="picker" placeholder="Fecha de Nacimiento" formControlName="fechaNacimiento">
                  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker [touchUi]="true"></mat-datepicker>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Entre Calles</mat-label>
                  <input matInput formControlName="entreCalles" placeholder="Entre Calles">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Departamento</mat-label>
                  <input matInput formControlName="departamento" placeholder="Departamento">
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Referencia</mat-label>
                  <input matInput formControlName="referencia" placeholder="Referencia">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Zona</mat-label>
                  <mat-select formControlName="zona" required>
                    <mat-option value="">Seleccionar Zona</mat-option>
                    <mat-option *ngFor="let zona of zonas" [value]="zona">{{ zona }}</mat-option>
                  </mat-select>
                  <mat-error *ngIf="shouldShow('zona','required')">Zona es requerida</mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Partido</mat-label>
                  <mat-select formControlName="partido" required>
                    <mat-option value="">Seleccionar Partido</mat-option>
                    <mat-option *ngFor="let partido of partidosDisponibles" [value]="partido">{{ partido }}</mat-option>
                  </mat-select>
                  <mat-error *ngIf="shouldShow('partido','required')">Partido es requerido</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Localidad</mat-label>
                  <mat-select formControlName="localidad" required>
                    <mat-option value="">Seleccionar Localidad</mat-option>
                    <mat-option *ngFor="let localidad of localidadesDisponibles" [value]="localidad">{{ localidad }}</mat-option>
                  </mat-select>
                  <mat-error *ngIf="shouldShow('localidad','required')">Localidad es requerida</mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Teléfono</mat-label>
                  <input matInput type="tel" formControlName="telefono" placeholder="Teléfono">
                  <mat-error *ngIf="shouldShow('telefono','pattern')">Formato de teléfono inválido</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Mail</mat-label>
                  <input matInput type="email" formControlName="mail" placeholder="Mail">
                  <mat-error *ngIf="shouldShow('mail','email')">Formato de email inválido</mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Medidor</mat-label>
                  <input matInput formControlName="medidor" placeholder="Medidor">
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Fecha</mat-label>
                  <input matInput [matDatepicker]="fechaPicker" placeholder="Fecha" formControlName="fecha" required>
                  <mat-datepicker-toggle matSuffix [for]="fechaPicker"></mat-datepicker-toggle>
                  <mat-datepicker #fechaPicker [touchUi]="true"></mat-datepicker>
                  <mat-error *ngIf="shouldShow('fecha','required')">Fecha es requerida</mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field-full">
                  <mat-label>Artefactos</mat-label>
                  <textarea matInput rows="3" formControlName="artefactos" placeholder="Artefactos"></textarea>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field-full">
                  <mat-label>Observaciones</mat-label>
                  <textarea matInput rows="3" formControlName="observaciones" placeholder="Observaciones"></textarea>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Nombre del Cliente</mat-label>
                  <input matInput formControlName="nombreCliente" placeholder="Nombre del Cliente" required>
                  <mat-error *ngIf="shouldShow('nombreCliente','required')">Nombre del Cliente es requerido</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Nombre del Promotor</mat-label>
                  <input matInput formControlName="nombrePromotor" placeholder="Nombre del Promotor" required>
                  <mat-error *ngIf="shouldShow('nombrePromotor','required')">Nombre del Promotor es requerido</mat-error>
                </mat-form-field>
              </div>
            </div>

            <mat-divider></mat-divider>

            <!-- Resultado -->
            <div class="section">
              <h2 class="section-title">Resultado</h2>
              <mat-form-field appearance="outline" class="form-field-full">
                <mat-label>Resultado</mat-label>
                <mat-select formControlName="resultado" required>
                  <mat-option value="">Seleccionar Resultado</mat-option>
                  <mat-option *ngFor="let resultado of resultados" [value]="resultado">{{ resultado }}</mat-option>
                </mat-select>
                <mat-error *ngIf="shouldShow('resultado','required')">Resultado es requerido</mat-error>
              </mat-form-field>
            </div>

            <mat-divider></mat-divider>

            <!-- Firmas -->
            <div class="section signatures-section">
              <h2 class="section-title">Firmas</h2>
              
              <div class="signatures-container">
                <div class="signature-box">
                  <h3>Firma Cliente</h3>
                  <div class="canvas-container">
                    <canvas #clienteCanvas class="signature-canvas" width="300" height="150"></canvas>
                    <div class="canvas-placeholder" *ngIf="!firmaCliente">Firma Cliente</div>
                  </div>
                  <button mat-stroked-button type="button" (click)="limpiarFirma('cliente')">
                    <mat-icon>clear</mat-icon>
                    Limpiar Firma
                  </button>
                </div>

                <div class="signature-box">
                  <h3>Firma Promotor</h3>
                  <div class="canvas-container">
                    <canvas #promotorCanvas class="signature-canvas" width="300" height="150"></canvas>
                    <div class="canvas-placeholder" *ngIf="!firmaPromotor">Firma Promotor</div>
                  </div>
                  <button mat-stroked-button type="button" (click)="limpiarFirma('promotor')">
                    <mat-icon>clear</mat-icon>
                    Limpiar Firma
                  </button>
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="actions">
              <button mat-flat-button color="primary" type="submit" [disabled]="!puedeEnviar || enviando">
                <mat-spinner *ngIf="enviando" diameter="20" class="button-spinner"></mat-spinner>
                <mat-icon *ngIf="!enviando">send</mat-icon>
                {{ enviando ? 'Enviando...' : 'Enviar' }}
              </button>
              <button mat-stroked-button type="button" (click)="onLimpiar()">
                <mat-icon>refresh</mat-icon>
                Limpiar
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Overlay de carga -->
      <div class="overlay" *ngIf="enviando">
        <mat-spinner diameter="50"></mat-spinner>
        <div class="overlay-message">Enviando formulario...</div>
      </div>
    </div>
  `,
  styles: `
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
    }

    /* Snackbars */
    .success-snackbar {
      background: #2e7d32;
      color: #fff;
      letter-spacing: .2px;
    }

    .error-snackbar {
      background: #c62828;
      color: #fff;
      letter-spacing: .2px;
    }

    .success-snackbar .mat-simple-snack-bar-action,
    .error-snackbar .mat-simple-snack-bar-action {
      color: #fff;
      font-weight: 600;
      text-transform: uppercase;
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

    .form-field-full {
      grid-column: 1 / -1;
      width: 100%;
    }

    .signatures-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
      margin-top: 20px;
    }

    .signatures-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    .signature-box {
      text-align: center;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .signature-box h3 {
      margin-bottom: 15px;
      color: #2c3e50;
      font-weight: 500;
    }

    .canvas-container {
      position: relative;
      display: inline-block;
      margin-bottom: 15px;
    }

    .signature-canvas {
      border: 2px dashed #bdc3c7;
      border-radius: 8px;
      cursor: crosshair;
      background: white;
      transition: border-color 0.3s ease;
    }

    .signature-canvas:hover {
      border-color: #3498db;
    }

    .canvas-placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #95a5a6;
      font-style: italic;
      pointer-events: none;
      z-index: 1;
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

      .signatures-container {
        grid-template-columns: 1fr;
        gap: 20px;
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

      .signature-canvas {
        width: 250px;
        height: 120px;
      }
    }
  `
})
export class FormularioRespaldo implements AfterViewInit {
  @ViewChild('clienteCanvas', { static: false }) clienteCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('promotorCanvas', { static: false }) promotorCanvas!: ElementRef<HTMLCanvasElement>;

  form: FormGroup;
  enviando: boolean = false;
  submitted: boolean = false;
  firmaCliente: boolean = false;
  firmaPromotor: boolean = false;

  // Datos para los selectores
  zonas: string[] = [
    "Zona Norte",
    "Zona Oeste",
    "Zona Sur",
    "Región Capital",
    "Región Norte",
    "Región Noroeste",
    "Región Centro",
    "Región Este (Costa Atlántica)",
    "Región Sur",
    "Región Sudoeste"
  ];

  partidosPorZona: { [key: string]: string[] } = {
    "Zona Norte": [
      "Vicente López",
      "San Isidro",
      "San Fernando",
      "Tigre",
      "Escobar",
      "Pilar",
      "Malvinas Argentinas",
      "San Miguel",
      "San Martín"
    ],
    "Zona Oeste": [
      "Tres de Febrero",
      "Hurlingham",
      "Morón",
      "Ituzaingó",
      "Merlo",
      "Moreno",
      "La Matanza"
    ],
    "Zona Sur": [
      "Avellaneda",
      "Lanús",
      "Lomas de Zamora",
      "Quilmes",
      "Berazategui",
      "Florencio Varela",
      "Almirante Brown",
      "Ezeiza",
      "Esteban Echeverría",
      "Presidente Perón"
    ],
    "Región Capital": [
      "La Plata",
      "Berisso",
      "Ensenada"
    ],
    "Región Norte": [
      "Zárate",
      "Campana",
      "Exaltación de la Cruz",
      "San Andrés de Giles",
      "San Antonio de Areco",
      "Baradero",
      "San Pedro",
      "Ramallo",
      "San Nicolás"
    ],
    "Región Noroeste": [
      "Pergamino",
      "Colón",
      "Rojas",
      "Salto",
      "Arrecifes",
      "Carmen de Areco",
      "Chacabuco",
      "Junín",
      "General Viamonte",
      "General Arenales",
      "Leandro N. Alem"
    ],
    "Región Centro": [
      "General Las Heras",
      "Lobos",
      "Cañuelas",
      "San Vicente",
      "Brandsen",
      "General Belgrano",
      "Rauch",
      "Las Flores",
      "25 de Mayo",
      "Roque Pérez",
      "Saladillo",
      "Bolívar",
      "Tapalqué",
      "Olavarría",
      "Azul"
    ],
    "Región Este (Costa Atlántica)": [
      "General Lavalle",
      "La Costa",
      "Pinamar",
      "Villa Gesell",
      "General Madariaga",
      "Mar Chiquita",
      "General Pueyrredón",
      "Balcarce",
      "Tandil"
    ],
    "Región Sur": [
      "Benito Juárez",
      "Necochea",
      "Lobería",
      "Tres Arroyos",
      "Gonzales Chaves",
      "Coronel Dorrego",
      "Coronel Pringles",
      "Coronel Suárez",
      "Laprida"
    ],
    "Región Sudoeste": [
      "Bahía Blanca",
      "Coronel Rosales",
      "Villarino",
      "Patagones",
      "Saavedra",
      "Tornquist",
      "Puan",
      "Adolfo Alsina",
      "Guaminí",
      "Daireaux",
      "Tres Lomas",
      "Pellegrini",
      "Rivadavia",
      "Carlos Tejedor",
      "Hipólito Yrigoyen",
      "Trenque Lauquen",
      "General Villegas"
    ]
  };

  localidadesPorPartido: { [key: string]: string[] } = {
    // Zona Norte
    "Vicente López": ["Olivos", "Florida", "Munro", "Carapachay", "Villa Martelli"],
    "San Isidro": ["San Isidro", "Martínez", "Acassuso", "Beccar", "Boulogne Sur Mer"],
    "San Fernando": ["San Fernando", "Victoria", "Virreyes", "Islas del Delta"],
    "Tigre": ["Tigre", "Don Torcuato", "General Pacheco", "Benavídez", "Nordelta", "El Talar"],
    "Escobar": ["Belén de Escobar", "Garín", "Ingeniero Maschwitz", "Maquinista Savio", "Matheu"],
    "Pilar": ["Pilar", "Del Viso", "Derqui", "Villa Rosa", "La Lonja", "Fátima"],
    "Malvinas Argentinas": ["Los Polvorines", "Grand Bourg", "Tortuguitas", "Sourdeaux"],
    "San Miguel": ["San Miguel", "Muñiz", "Bella Vista"],
    "San Martín": ["San Martín", "Villa Ballester", "José León Suárez", "Billinghurst"],

    // Zona Oeste
    "Tres de Febrero": ["Caseros", "Ciudad Jardín", "Ciudadela", "Santos Lugares"],
    "Hurlingham": ["Hurlingham", "William C. Morris", "Villa Tesei"],
    "Morón": ["Morón", "Castelar", "Haedo", "El Palomar"],
    "Ituzaingó": ["Ituzaingó", "Udaondo"],
    "Merlo": ["Merlo", "Padua", "Parque San Martín", "Mariano Acosta"],
    "Moreno": ["Moreno", "La Reja", "Paso del Rey", "Francisco Álvarez"],
    "La Matanza": ["San Justo", "Ramos Mejía", "Laferrere", "González Catán", "Virrey del Pino", "Gregorio de Laferrere"],

    // Zona Sur
    "Avellaneda": ["Avellaneda", "Wilde", "Dock Sud", "Sarandí"],
    "Lanús": ["Lanús Este", "Lanús Oeste", "Remedios de Escalada", "Valentín Alsina"],
    "Lomas de Zamora": ["Lomas de Zamora", "Banfield", "Temperley", "Turdera"],
    "Quilmes": ["Quilmes", "Bernal", "Ezpeleta", "Don Bosco"],
    "Berazategui": ["Berazategui", "Ranelagh", "El Pato", "Sourigues"],
    "Florencio Varela": ["Florencio Varela", "Bosques", "Zeballos", "Ingeniero Allan"],
    "Almirante Brown": ["Adrogué", "Burzaco", "Claypole", "Longchamps", "Glew", "Rafael Calzada"],
    "Ezeiza": ["Ezeiza", "Tristán Suárez", "La Unión", "Canning"],
    "Esteban Echeverría": ["Monte Grande", "El Jagüel", "Luis Guillón"],
    "Presidente Perón": ["Guernica"],

    // Región Capital
    "La Plata": ["La Plata", "City Bell", "Gonnet", "Tolosa", "Los Hornos", "Villa Elisa"],
    "Berisso": ["Berisso", "Los Talas", "Villa Progreso"],
    "Ensenada": ["Ensenada", "Punta Lara", "Villa Catella"],

    // Región Norte
    "Zárate": ["Zárate", "Lima"],
    "Campana": ["Campana"],
    "Exaltación de la Cruz": ["Capilla del Señor", "Los Cardales"],
    "San Andrés de Giles": ["San Andrés de Giles", "Villa Ruiz"],
    "San Antonio de Areco": ["San Antonio de Areco", "Villa Lía"],
    "Baradero": ["Baradero", "Alsina"],
    "San Pedro": ["San Pedro", "Río Tala"],
    "Ramallo": ["Ramallo", "Villa Ramallo", "El Paraíso"],
    "San Nicolás": ["San Nicolás de los Arroyos", "La Emilia", "Conesa"],

    // Región Noroeste
    "Pergamino": ["Pergamino", "Acevedo", "Rancagua"],
    "Colón": ["Colón", "Pearson"],
    "Rojas": ["Rojas", "Rafael Obligado"],
    "Salto": ["Salto", "Inés Indart"],
    "Arrecifes": ["Arrecifes", "Todd"],
    "Carmen de Areco": ["Carmen de Areco"],
    "Chacabuco": ["Chacabuco", "Rawson"],
    "Junín": ["Junín", "Agustina", "Saforcada"],
    "General Viamonte": ["Los Toldos", "Baigorrita"],
    "General Arenales": ["Arenales", "Arribeños"],
    "Leandro N. Alem": ["Vedia", "Juan Bautista Alberdi"],

    // Región Centro
    "General Las Heras": ["Las Heras"],
    "Lobos": ["Lobos", "Salvador María"],
    "Cañuelas": ["Cañuelas", "Máximo Paz"],
    "San Vicente": ["San Vicente", "Alejandro Korn"],
    "Brandsen": ["Brandsen", "Jeppener"],
    "General Belgrano": ["General Belgrano"],
    "Rauch": ["Rauch"],
    "Las Flores": ["Las Flores"],
    "25 de Mayo": ["25 de Mayo", "Norberto de la Riestra"],
    "Roque Pérez": ["Roque Pérez"],
    "Saladillo": ["Saladillo", "Del Carril"],
    "Bolívar": ["San Carlos de Bolívar"],
    "Tapalqué": ["Tapalqué"],
    "Olavarría": ["Olavarría", "Hinojo", "Sierra Chica"],
    "Azul": ["Azul", "Chillar", "Cacharí"],

    // Región Este (Costa Atlántica)
    "General Lavalle": ["General Lavalle"],
    "La Costa": ["San Clemente del Tuyú", "Santa Teresita", "Mar de Ajó", "San Bernardo", "Las Toninas"],
    "Pinamar": ["Pinamar", "Ostende", "Valeria del Mar", "Cariló"],
    "Villa Gesell": ["Villa Gesell", "Mar Azul", "Mar de las Pampas"],
    "General Madariaga": ["General Madariaga"],
    "Mar Chiquita": ["Coronel Vidal", "Santa Clara del Mar"],
    "General Pueyrredón": ["Mar del Plata", "Batán"],
    "Balcarce": ["Balcarce", "Napaleofú"],
    "Tandil": ["Tandil", "Vela", "Gardey"],

    // Región Sur
    "Benito Juárez": ["Juárez", "Barker"],
    "Necochea": ["Necochea", "Quequén"],
    "Lobería": ["Lobería", "San Manuel"],
    "Tres Arroyos": ["Tres Arroyos", "Claromecó"],
    "Gonzales Chaves": ["De la Garma"],
    "Coronel Dorrego": ["Dorrego", "Oriente"],
    "Coronel Pringles": ["Pringles", "Indio Rico"],
    "Coronel Suárez": ["Coronel Suárez", "Huanguelén"],
    "Laprida": ["Laprida"],

    // Región Sudoeste
    "Bahía Blanca": ["Bahía Blanca", "Ingeniero White", "Cabildo"],
    "Coronel Rosales": ["Punta Alta", "Pehuen Có"],
    "Villarino": ["Médanos", "Pedro Luro"],
    "Patagones": ["Carmen de Patagones"],
    "Saavedra": ["Pigüé", "Saavedra"],
    "Tornquist": ["Tornquist", "Sierra de la Ventana", "Villa Ventana"],
    "Puan": ["Puan", "Darregueira", "Felipe Solá"],
    "Adolfo Alsina": ["Carhué"],
    "Guaminí": ["Guaminí", "Casbas"],
    "Daireaux": ["Daireaux", "Arboledas"],
    "Tres Lomas": ["Tres Lomas", "Ingeniero Thompson"],
    "Pellegrini": ["Pellegrini"],
    "Rivadavia": ["América", "Fortín Olavarría"],
    "Carlos Tejedor": ["Carlos Tejedor", "Tres Algarrobos"],
    "Hipólito Yrigoyen": ["Henderson"],
    "Trenque Lauquen": ["Trenque Lauquen", "Berutti"],
    "General Villegas": ["General Villegas", "Piedritas", "Bunge"]
  };

  resultados: string[] = [
    "Cliente Capacitado",
    "Cliente Capacitado - Vivienda en Construcción",
    "Cliente no Capacitado - Cliente Ausente",
    "Cliente no Capacitado - No se Ubica",
    "Cliente no Capacitado - Vivienda Deshabitada",
    "Cliente no Capacitado – Vivienda en Construcción",
    "Cliente no Capacitado – No Quiso Firmar"
  ];

  get partidosDisponibles(): string[] {
    const zonaSeleccionada = this.form.get('zona')?.value;
    return zonaSeleccionada ? this.partidosPorZona[zonaSeleccionada] || [] : [];
  }

  get localidadesDisponibles(): string[] {
    const partidoSeleccionado = this.form.get('partido')?.value;
    return partidoSeleccionado ? this.localidadesPorPartido[partidoSeleccionado] || [] : [];
  }

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private formularioService: FormularioService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      // Información del cliente
      idCuenta: new FormControl<string | null>(null, { validators: [Validators.required] }),
      numeroMedidor: new FormControl<string | null>(null, { validators: [Validators.required] }),
      nombreTitular: new FormControl<string | null>(null, { validators: [Validators.required] }),
      dni: new FormControl<string | null>(null, { validators: [Validators.required] }),
      direccion: new FormControl<string | null>(null),
      fechaNacimiento: new FormControl<Date | null>(null),
      entreCalles: new FormControl<string | null>(null),
      departamento: new FormControl<string | null>(null),
      referencia: new FormControl<string | null>(null),
      zona: new FormControl<string | null>(null, { validators: [Validators.required] }),
      partido: new FormControl<string | null>(null, { validators: [Validators.required] }),
      localidad: new FormControl<string | null>(null, { validators: [Validators.required] }),
      telefono: new FormControl<string | null>(null, { validators: [Validators.pattern(/^[+]?[\d\s\-\(\)]+$/)] }),
      mail: new FormControl<string | null>(null, { validators: [Validators.email] }),
      medidor: new FormControl<string | null>(null),
      artefactos: new FormControl<string | null>(null),
      observaciones: new FormControl<string | null>(null),
      nombreCliente: new FormControl<string | null>(null, { validators: [Validators.required] }),
      nombrePromotor: new FormControl<string | null>(null, { validators: [Validators.required] }),
      fecha: new FormControl<Date | null>(null, { validators: [Validators.required] }),
      resultado: new FormControl<string | null>(null, { validators: [Validators.required] }),
    });

    // Establecer fecha actual
    this.form.patchValue({ fecha: new Date() });

    // Suscribirse a cambios en zona para actualizar partidos
    this.form.get('zona')?.valueChanges.subscribe(() => {
      this.form.patchValue({ partido: null, localidad: null });
    });

    // Suscribirse a cambios en partido para actualizar localidades
    this.form.get('partido')?.valueChanges.subscribe(() => {
      this.form.patchValue({ localidad: null });
    });
  }

  ngAfterViewInit() {
    this.initializeSignaturePads();
  }

  get puedeEnviar(): boolean {
    return this.form.valid && this.firmaCliente && this.firmaPromotor;
  }

  private initializeSignaturePads() {
    if (this.clienteCanvas && this.promotorCanvas) {
      this.setupCanvas(this.clienteCanvas.nativeElement, 'cliente');
      this.setupCanvas(this.promotorCanvas.nativeElement, 'promotor');
    }
  }

  private setupCanvas(canvas: HTMLCanvasElement, tipo: 'cliente' | 'promotor') {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Configurar el canvas
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Eventos de mouse
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      this.marcarFirma(tipo);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      lastX = currentX;
      lastY = currentY;
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
      isDrawing = false;
    });

    // Eventos táctiles
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      lastX = touch.clientX - rect.left;
      lastY = touch.clientY - rect.top;
      this.marcarFirma(tipo);
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const currentX = touch.clientX - rect.left;
      const currentY = touch.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      lastX = currentX;
      lastY = currentY;
    });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      isDrawing = false;
    });
  }

  private marcarFirma(tipo: 'cliente' | 'promotor') {
    if (tipo === 'cliente') {
      this.firmaCliente = true;
    } else {
      this.firmaPromotor = true;
    }
  }

  limpiarFirma(tipo: 'cliente' | 'promotor') {
    const canvas = tipo === 'cliente' ? this.clienteCanvas?.nativeElement : this.promotorCanvas?.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    if (tipo === 'cliente') {
      this.firmaCliente = false;
    } else {
      this.firmaPromotor = false;
    }
  }

  shouldShow(controlName: string, error?: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false;
    const hasError = error ? control.hasError(error) : control.invalid;
    return (control.touched || this.submitted) && hasError;
  }

  onSubmit() {
    this.submitted = true;
    // Validar que las firmas estén presentes
    if (!this.firmaCliente || !this.firmaPromotor) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, complete ambas firmas', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Validar que el formulario sea válido
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.enviando = true;

    // Preparar el payload con los datos del formulario
    const payload = {
      ...this.form.value,
      firmaCliente: this.clienteCanvas?.nativeElement.toDataURL(),
      firmaPromotor: this.promotorCanvas?.nativeElement.toDataURL()
    };

    console.log('Enviando formulario:', payload);

    // Enviar al backend
    this.formularioService.enviarFormulario(payload).subscribe({
      next: (res: any) => {
        this.enviando = false;
        if (res && res.status >= 200 && res.status < 300) {
          this.submitted = false;
          const ref = this.dialog.open(ResultadoDialogComponent, {
            width: '420px',
            panelClass: 'resultado-dialog',
            data: {
              title: '¡Formulario enviado!',
              message: 'Tu formulario fue enviado correctamente.',
              type: 'success'
            }
          });
          ref.afterClosed().subscribe(() => {
            // Limpiar formulario después de confirmar el modal
        // this.onLimpiar();
        //al no estar funcionando el limpiar, se recarga la página para que el formulario se reinicie
        window.location.reload();
          });
        } else {
          this.submitted = false;
          this.dialog.open(ResultadoDialogComponent, {
            width: '420px',
            panelClass: 'resultado-dialog',
            data: {
              title: 'No se pudo enviar',
              message: 'Hubo un problema con el envío. Intenta nuevamente.',
              type: 'error'
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error al enviar formulario:', err);
        this.enviando = false;
        const mensaje = err?.status
          ? `Error ${err.status}: No se pudo enviar el formulario.`
          : 'Error de conexión. Verifique su red e intente nuevamente.';
        this.submitted = false;
        this.dialog.open(ResultadoDialogComponent, {
          width: '420px',
          panelClass: 'resultado-dialog',
          data: {
            title: 'Error al enviar',
            message: mensaje,
            type: 'error'
          }
        });
      }
    });
  }

  onLimpiar() {
    this.submitted = false;
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
    this.form.patchValue({ fecha: new Date() });
    this.limpiarFirma('cliente');
    this.limpiarFirma('promotor');
    this.snackBar.open('Formulario limpiado', 'Cerrar', {
      duration: 2000
    });
  }
}

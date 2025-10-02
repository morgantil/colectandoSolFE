import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
  ],
  template: `
  <div class="container">
    <!-- Logos -->
    <div class="logo-container">
      <img class="logo" src="https://www.edenor.com/themes/custom/edenor/logo-color.svg" alt="Logo Edenor">
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
                <mat-error *ngIf="form.get('idCuenta')?.hasError('required')">ID de Cuenta es requerido</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Número de Medidor</mat-label>
                <input matInput formControlName="numeroMedidor" placeholder="Número de Medidor" required>
                <mat-error *ngIf="form.get('numeroMedidor')?.hasError('required')">Número de Medidor es requerido</mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Nombre del Titular</mat-label>
                <input matInput formControlName="nombreTitular" placeholder="Nombre del Titular" required>
                <mat-error *ngIf="form.get('nombreTitular')?.hasError('required')">Nombre del Titular es requerido</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>DNI</mat-label>
                <input matInput formControlName="dni" placeholder="DNI" required>
                <mat-error *ngIf="form.get('dni')?.hasError('required')">DNI es requerido</mat-error>
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
                <mat-error *ngIf="form.get('zona')?.hasError('required')">Zona es requerida</mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Partido</mat-label>
                <mat-select formControlName="partido" required>
                  <mat-option value="">Seleccionar Partido</mat-option>
                  <mat-option *ngFor="let partido of partidosDisponibles" [value]="partido">{{ partido }}</mat-option>
                </mat-select>
                <mat-error *ngIf="form.get('partido')?.hasError('required')">Partido es requerido</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Localidad</mat-label>
                <mat-select formControlName="localidad" required>
                  <mat-option value="">Seleccionar Localidad</mat-option>
                  <mat-option *ngFor="let localidad of localidadesDisponibles" [value]="localidad">{{ localidad }}</mat-option>
                </mat-select>
                <mat-error *ngIf="form.get('localidad')?.hasError('required')">Localidad es requerida</mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Teléfono</mat-label>
                <input matInput type="tel" formControlName="telefono" placeholder="Teléfono">
                <mat-error *ngIf="form.get('telefono')?.hasError('pattern')">Formato de teléfono inválido</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Mail</mat-label>
                <input matInput type="email" formControlName="mail" placeholder="Mail">
                <mat-error *ngIf="form.get('mail')?.hasError('email')">Formato de email inválido</mat-error>
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
                <mat-error *ngIf="form.get('fecha')?.hasError('required')">Fecha es requerida</mat-error>
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
                <mat-error *ngIf="form.get('nombreCliente')?.hasError('required')">Nombre del Cliente es requerido</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Nombre del Promotor</mat-label>
                <input matInput formControlName="nombrePromotor" placeholder="Nombre del Promotor" required>
                <mat-error *ngIf="form.get('nombrePromotor')?.hasError('required')">Nombre del Promotor es requerido</mat-error>
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
              <mat-error *ngIf="form.get('resultado')?.hasError('required')">Resultado es requerido</mat-error>
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
  firmaCliente: boolean = false;
  firmaPromotor: boolean = false;

  // Datos para los selectores
  zonas: string[] = [
    "Olivos", "San Martín", "La Matanza", "Merlo", "Morón", "Moreno", "Pilar", "San Miguel", "Tigre"
  ];

  partidosPorZona: { [key: string]: string[] } = {
    "Olivos": ["San Isidro", "Vicente Lopez"],
    "San Martín": ["3 de febrero", "Gral San Martin"],
    "La Matanza": ["La Matanza"],
    "Merlo": ["Gral Las Heras", "Marcos Paz", "Merlo"],
    "Morón": ["Hurlingham", "Ituzaingo", "Morón"],
    "Moreno": ["Gral Rodriguez", "Moreno"],
    "Pilar": ["Escobar", "Pilar"],
    "San Miguel": ["Jose C Paz", "Malvinas Argentinas", "San Miguel"],
    "Tigre": ["San Fernando", "Tigre"]
  };

  localidadesPorPartido: { [key: string]: string[] } = {
    "Vicente Lopez": ["Carapachay", "Florida (Oeste)", "La Lucila", "Munro", "Vicente Lopez", "Villa Adelina (VL)", "Villa Martelli"],
    "San Isidro": ["Beccar", "Boulogne", "San Isidro"],
    "3 de febrero": ["11 de septiembre", "Caseros", "Churruca", "Ciudadela", "El Libertador", "Jose Ingenieros", "Loma Hermosa", "Martin Coronado", "Pablo Podesta", "Remedios de Escalada", "Santos Lugares", "Villa Bosch", "Villa Raffo"],
    "Gral San Martin": ["Ayacucho", "Bernardo Monteagudo", "Billinghurst", "C Jardin El Libertador", "C Libertador San Martin", "Chacabuco", "Cnel Jose Zapiola", "Gderos de San Martin", "Godoy Cruz", "Gral Eugenio Necochea", "Gral Jose de Sucre", "Gral Jose Tomas Guido", "Gregoria Matorras", "Jose Leon Suarez", "Juan M de Pueyrredon", "Marques A de Aguado", "Parque San Lorenzo", "Villa Ballester", "Villa Libertad", "Villa Maipu", "Yapeyu"],
    "La Matanza": ["20 de junio", "Aldo Bonzi", "Ciudad Evita", "Gonzalez Catan", "Gregorio de Laferrere", "Isidro Casanova", "La Tablada", "Lomas del Mirador", "Rafael Castillo", "Ramos Mejia", "San Justo", "Tapiales", "Villa Luzuriaga", "Villa Madero", "Virrey del Pino"],
    "Gral Las Heras": ["Gral Las Heras"],
    "Marcos Paz": ["Marcos Paz"],
    "Merlo": ["Libertad", "Mariano Acosta", "Merlo", "Pontevedra", "San Antonio de Padua"],
    "Hurlingham": ["Hurlingham", "Villa Tesei", "William Morris"],
    "Ituzaingo": ["Ituzaingo", "Villa Udaondo"],
    "Moron": ["Castelar", "El Palomar", "Moron", "Villa Sarmiento"],
    "Gral Rodriguez": ["Gral Rodriguez"],
    "Moreno": ["Cuartel V", "Francisco Alvarez", "La Reja", "Moreno", "Paso del Rey", "Trujui"],
    "Escobar": ["Delta 1ra Seccion (ES)", "Escobar", "Garin", "Ingeniero Maschwitz", "Maquinista Savio", "Matheu"],
    "Pilar": ["Del Viso", "Fatima", "La Lonja", "Luis Lagomarsino", "Manuel Alberti", "Manzanares", "Pilar", "Pte Derqui", "Villa Astolfi", "Villa Rosa", "Zelaya"],
    "Jose C Paz": ["Jose C Paz"],
    "Malvinas Argentinas": ["Adolfo Sourdeaux", "El Triangulo", "Grand Bourg", "Los Polvorines", "Pablo Nogues", "Tierras Altas", "Tortuguitas", "Villa de Mayo"],
    "San Miguel": ["Bella Vista", "Muñiz", "San Miguel"],
    "San Fernando": ["Delta 3ra Seccion (SF)", "San Fernando", "Victoria", "Virreyes"],
    "Tigre": ["Benavidez", "Ciudad de Tigre", "Delta 1ra Seccion (TI)", "Dique Lujan", "Don Torcuato", "El Talar", "General Pacheco", "Ricardo Rojas", "Rincon de Milberg", "Troncos del Talar"]
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

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
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

  onSubmit() {
    if (!this.puedeEnviar) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, complete todos los campos requeridos y las firmas', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.enviando = true;

    // Simular envío (aquí iría la lógica real de envío)
    setTimeout(() => {
      const payload = {
        ...this.form.value,
        firmaCliente: this.clienteCanvas?.nativeElement.toDataURL(),
        firmaPromotor: this.promotorCanvas?.nativeElement.toDataURL()
      };

      console.log('Formulario enviado:', payload);
      
      this.enviando = false;
      this.snackBar.open('Formulario enviado exitosamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }, 2000);
  }

  onLimpiar() {
    this.form.reset();
    this.form.patchValue({ fecha: new Date() });
    this.limpiarFirma('cliente');
    this.limpiarFirma('promotor');
    this.snackBar.open('Formulario limpiado', 'Cerrar', {
      duration: 2000
    });
  }
}

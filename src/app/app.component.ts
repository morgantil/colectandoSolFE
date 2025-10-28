  // ...existing code...
// Declaración global para SignaturePad
declare global {
  interface Window {
    SignaturePad: any;
  }
}

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormularioService } from './formulario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app-formulario';

  zonas: string[] = [
    'Olivos', 'San Martín', 'La Matanza', 'Merlo', 'Morón', 'Moreno', 'Pilar', 'San Miguel', 'Tigre'
  ];
  partidosPorZona: any = {
    'Olivos': ['San Isidro', 'Vicente Lopez'],
    'San Martín': ['3 de febrero', 'Gral San Martin'],
    'La Matanza': ['La Matanza'],
    'Merlo': ['Gral Las Heras', 'Marcos Paz', 'Merlo'],
    'Morón': ['Hurlingham', 'Ituzaingo', 'Morón'],
    'Moreno': ['Gral Rodriguez', 'Moreno'],
    'Pilar': ['Escobar', 'Pilar'],
    'San Miguel': ['Jose C Paz', 'Malvinas Argentinas', 'San Miguel'],
    'Tigre': ['San Fernando', 'Tigre']
  };
  localidadesPorPartido: any = {
    'Vicente Lopez': ['Carapachay', 'Florida (Oeste)', 'La Lucila', 'Munro', 'Vicente Lopez', 'Villa Adelina (VL)', 'Villa Martelli'],
    'San Isidro': ['Beccar', 'Boulogne', 'San Isidro'],
    '3 de febrero': ['11 de septiembre', 'Caseros', 'Churruca', 'Ciudadela', 'El Libertador', 'Jose Ingenieros', 'Loma Hermosa', 'Martin Coronado', 'Pablo Podesta', 'Remedios de Escalada', 'Santos Lugares', 'Villa Bosch', 'Villa Raffo'],
    'Gral San Martin': ['Ayacucho', 'Bernardo Monteagudo', 'Billinghurst', 'C Jardin El Libertador', 'C Libertador San Martin', 'Chacabuco', 'Cnel Jose Zapiola', 'Gderos de San Martin', 'Godoy Cruz', 'Gral Eugenio Necochea', 'Gral Jose de Sucre', 'Gral Jose Tomas Guido', 'Gregoria Matorras', 'Jose Leon Suarez', 'Juan M de Pueyrredon', 'Marques A de Aguado', 'Parque San Lorenzo', 'Villa Ballester', 'Villa Libertad', 'Villa Maipu', 'Yapeyu'],
    'La Matanza': ['20 de junio', 'Aldo Bonzi', 'Ciudad Evita', 'Gonzalez Catan', 'Gregorio de Laferrere', 'Isidro Casanova', 'La Tablada', 'Lomas del Mirador', 'Rafael Castillo', 'Ramos Mejia', 'San Justo', 'Tapiales', 'Villa Luzuriaga', 'Villa Madero', 'Virrey del Pino'],
    'Gral Las Heras': ['Gral Las Heras'],
    'Marcos Paz': ['Marcos Paz'],
    'Merlo': ['Libertad', 'Mariano Acosta', 'Merlo', 'Pontevedra', 'San Antonio de Padua'],
    'Hurlingham': ['Hurlingham', 'Villa Tesei', 'William Morris'],
    'Ituzaingo': ['Ituzaingo', 'Villa Udaondo'],
    'Moron': ['Castelar', 'El Palomar', 'Moron', 'Villa Sarmiento'],
    'Gral Rodriguez': ['Gral Rodriguez'],
    'Moreno': ['Cuartel V', 'Francisco Alvarez', 'La Reja', 'Moreno', 'Paso del Rey', 'Trujui'],
    'Escobar': ['Delta 1ra Seccion (ES)', 'Escobar', 'Garin', 'Ingeniero Maschwitz', 'Maquinista Savio', 'Matheu'],
    'Pilar': ['Del Viso', 'Fatima', 'La Lonja', 'Luis Lagomarsino', 'Manuel Alberti', 'Manzanares', 'Pilar', 'Pte Derqui', 'Villa Astolfi', 'Villa Rosa', 'Zelaya'],
    'Jose C Paz': ['Jose C Paz'],
    'Malvinas Argentinas': ['Adolfo Sourdeaux', 'El Triangulo', 'Grand Bourg', 'Los Polvorines', 'Pablo Nogues', 'Tierras Altas', 'Tortuguitas', 'Villa de Mayo'],
    'San Miguel': ['Bella Vista', 'Muñiz', 'San Miguel'],
    'San Fernando': ['Delta 3ra Seccion (SF)', 'San Fernando', 'Victoria', 'Virreyes'],
    'Tigre': ['Benavidez', 'Ciudad de Tigre', 'Delta 1ra Seccion (TI)', 'Dique Lujan', 'Don Torcuato', 'El Talar', 'General Pacheco', 'Ricardo Rojas', 'Rincon de Milberg', 'Troncos del Talar']
  };

  zonaSeleccionada: string = '';
  partidoSeleccionado: string = '';
  partidos: string[] = [];
  localidades: string[] = [];

  @ViewChild('signatureClienteCanvas', { static: false }) signatureClienteCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('signaturePromotorCanvas', { static: false }) signaturePromotorCanvas?: ElementRef<HTMLCanvasElement>;
  signatureClientePad: any;
  signaturePromotorPad: any;

  constructor(private formularioService: FormularioService) {}

  ngAfterViewInit() {
    // Ocultar el placeholder si se detecta interacción
    if (this.signatureClienteCanvas?.nativeElement) {
      this.signatureClienteCanvas.nativeElement.addEventListener('mousedown', () => {
        const placeholder = document.getElementById('placeholderFirmaCliente');
        if (placeholder) placeholder.style.display = 'none';
      });
      this.signatureClienteCanvas.nativeElement.addEventListener('touchstart', () => {
        const placeholder = document.getElementById('placeholderFirmaCliente');
        if (placeholder) placeholder.style.display = 'none';
      });
    }
    if (this.signaturePromotorCanvas?.nativeElement) {
      this.signaturePromotorCanvas.nativeElement.addEventListener('mousedown', () => {
        const placeholder = document.getElementById('placeholderFirmaPromotor');
        if (placeholder) placeholder.style.display = 'none';
      });
      this.signaturePromotorCanvas.nativeElement.addEventListener('touchstart', () => {
        const placeholder = document.getElementById('placeholderFirmaPromotor');
        if (placeholder) placeholder.style.display = 'none';
      });
    }
    // Solo ejecutar en el navegador (no en SSR)
    if (typeof window !== 'undefined' && window.SignaturePad && this.signatureClienteCanvas && this.signaturePromotorCanvas) {
  // Ajustar tamaño del canvas para alta resolución
  this._resizeCanvas(this.signatureClienteCanvas.nativeElement);
  this._resizeCanvas(this.signaturePromotorCanvas.nativeElement);
  this.signatureClientePad = new window.SignaturePad(this.signatureClienteCanvas.nativeElement);
  this.signaturePromotorPad = new window.SignaturePad(this.signaturePromotorCanvas.nativeElement);
    }
    this.setTodayDate();
  }

  private _resizeCanvas(canvas: HTMLCanvasElement) {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = 600 * ratio;
    canvas.height = 150 * ratio;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(ratio, ratio);
  }

  onZonaChange(event: any) {
    this.zonaSeleccionada = event.target.value;
    this.partidos = this.partidosPorZona[this.zonaSeleccionada] || [];
    this.partidoSeleccionado = '';
    this.localidades = [];
  }

  onPartidoChange(event: any) {
    this.partidoSeleccionado = event.target.value;
    this.localidades = this.localidadesPorPartido[this.partidoSeleccionado] || [];
  }

  setTodayDate() {
    if (typeof document !== 'undefined') {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const fechaInput = document.getElementById('fecha') as HTMLInputElement;
      if (fechaInput) fechaInput.value = formattedDate;
    }
  }

  clearSignature(tipo: 'cliente' | 'promotor') {
    if (tipo === 'cliente' && this.signatureClientePad) {
      this.signatureClientePad.clear();
      const placeholder = document.getElementById('placeholderFirmaCliente');
      if (placeholder) placeholder.style.display = 'block';
    } else if (tipo === 'promotor' && this.signaturePromotorPad) {
      this.signaturePromotorPad.clear();
      const placeholder = document.getElementById('placeholderFirmaPromotor');
      if (placeholder) placeholder.style.display = 'block';
    }
  }

  hidePlaceholder(tipo: 'cliente' | 'promotor') {
    if (tipo === 'cliente') {
      const placeholder = document.getElementById('placeholderFirmaCliente');
      if (placeholder) placeholder.style.display = 'none';
    } else {
      const placeholder = document.getElementById('placeholderFirmaPromotor');
      if (placeholder) placeholder.style.display = 'none';
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const overlay = document.getElementById('overlay');
    const container = document.querySelector('.container') as HTMLElement;
    if (overlay && container) {
      overlay.style.display = 'flex';
      container.style.display = 'none';
    }
    // Validar firmas
    if (!this.signatureClientePad || !this.signaturePromotorPad) {
      if (overlay && container) {
        overlay.style.display = 'none';
        container.style.display = 'block';
      }
      this.mostrarOverlayMensaje('Error: la firma no está inicializada.');
      return;
    }
    if (this.signatureClientePad.isEmpty() || this.signaturePromotorPad.isEmpty()) {
      if (overlay && container) {
        overlay.style.display = 'none';
        container.style.display = 'block';
      }
      this.mostrarOverlayMensaje('Por favor, completa ambas firmas.');
      return;
    }
    // Recopilar datos del formulario
    const form: any = document.getElementById('formulario');
    const data: any = {};
    Array.from(form.elements).forEach((el: any) => {
      if (el.name && el.value !== undefined) {
        data[el.name] = el.value;
      }
    });
    // Agregar firmas como imagen base64
    data.firmaCliente = this.signatureClientePad.toDataURL();
    data.firmaPromotor = this.signaturePromotorPad.toDataURL();
    // Enviar al backend
    this.formularioService.enviarFormulario(data).subscribe({
      next: (res) => {
        this.mostrarOverlayMensaje('¡Formulario Enviado!');
      },
      error: (err) => {
        if (overlay && container) {
          overlay.style.display = 'none';
          container.style.display = 'block';
        }
        this.mostrarOverlayMensaje('Error al enviar el formulario.');
      }
    });
  }

  mostrarOverlayMensaje(texto: string) {
    const overlayMessage = document.getElementById('overlay-message');
    if (overlayMessage) {
      overlayMessage.textContent = texto;
      overlayMessage.style.display = 'block';
    }
  }
}

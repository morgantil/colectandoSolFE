import { Injectable } from '@angular/core';

export interface FormularioData {
  idCuenta: string;
  numeroMedidor: string;
  nombreTitular: string;
  dni: string;
  direccion?: string;
  fechaNacimiento?: Date;
  entreCalles?: string;
  departamento?: string;
  referencia?: string;
  zona: string;
  partido: string;
  localidad: string;
  telefono?: string;
  mail?: string;
  medidor?: string;
  artefactos?: string;
  observaciones?: string;
  nombreCliente: string;
  nombrePromotor: string;
  fecha: Date;
  resultado: string;
  firmaCliente?: string;
  firmaPromotor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private readonly SPREADSHEET_ID = '1nyiGHmpKBcCrpiRvfYg2rpK8cHB9OqWNL90S4rxNaBY';
  private readonly SHEET_NAME = 'Formularios'; // Nombre de la hoja donde se guardarán los datos

  constructor() {}


  private prepararDatosParaEnvio(data: FormularioData): any[] {
    // Convertir los datos del formulario en un array que coincida con las columnas de la hoja
    return [
      new Date().toISOString(), // Timestamp de envío
      data.idCuenta,
      data.numeroMedidor,
      data.nombreTitular,
      data.dni,
      data.direccion || '',
      data.fechaNacimiento ? data.fechaNacimiento.toISOString().split('T')[0] : '',
      data.entreCalles || '',
      data.departamento || '',
      data.referencia || '',
      data.zona,
      data.partido,
      data.localidad,
      data.telefono || '',
      data.mail || '',
      data.medidor || '',
      data.fecha ? data.fecha.toISOString().split('T')[0] : '',
      data.artefactos || '',
      data.observaciones || '',
      data.nombreCliente,
      data.nombrePromotor,
      data.resultado,
      data.firmaCliente ? 'Firma Cliente Presente' : 'Sin Firma Cliente',
      data.firmaPromotor ? 'Firma Promotor Presente' : 'Sin Firma Promotor'
    ];
  }

  // Método principal para enviar datos usando Google Apps Script (evita CORS)
  async enviarFormulario(data: FormularioData): Promise<boolean> {
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbzVGj7pSlqzrlFc_gVEybQwT_3y2FEOjgXuTLNpe5NxvR6d_xQmq8t6cmqN5HwUGZFW/exec';
      
      // Usar técnica de formulario oculto para evitar CORS
      return new Promise((resolve) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = scriptUrl;
        form.target = 'hiddenFrame';
        
        // Crear iframe oculto para recibir la respuesta
        let iframe = document.getElementById('hiddenFrame') as HTMLIFrameElement;
        if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.id = 'hiddenFrame';
          iframe.name = 'hiddenFrame';
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }
        
        // Agregar datos como campos ocultos
        const dataField = document.createElement('input');
        dataField.type = 'hidden';
        dataField.name = 'data';
        dataField.value = JSON.stringify({
          action: 'addFormData',
          data: this.prepararDatosParaEnvio(data)
        });
        
        form.appendChild(dataField);
        document.body.appendChild(form);
        
        // Manejar la respuesta
        iframe.onload = () => {
          document.body.removeChild(form);
          // Asumir éxito si no hay error
          resolve(true);
        };
        
        // Enviar formulario
        form.submit();
        
        // Timeout de seguridad
        setTimeout(() => {
          try {
            if (document.body.contains(form)) {
              document.body.removeChild(form);
            }
          } catch (e) {
            // Ignorar errores de limpieza
          }
          resolve(true);
        }, 5000);
      });

    } catch (error) {
      console.error('Error al enviar datos via Apps Script:', error);
      return false;
    }
  }
}

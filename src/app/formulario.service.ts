import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private apiUrl = 'https://colectandosolbe.onrender.com/api/formulario';
  private exportUrl = 'https://colectandosolbe.onrender.com/api/formularios/export';

  constructor(private http: HttpClient) {}

  enviarFormulario(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl, data, { observe: 'response' });
  }

  descargarExcel(startDate: string, endDate: string): Observable<Blob> {
    const params = new URLSearchParams();
    params.append('format', 'xlsx');
    params.append('startDate', startDate);
    params.append('endDate', endDate);

    return this.http.get(`${this.exportUrl}?${params.toString()}`, {
      responseType: 'blob'
    });
  }
}


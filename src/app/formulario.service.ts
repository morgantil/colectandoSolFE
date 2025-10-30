import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private apiUrl = 'https://colectandosolbe.onrender.com/api/formulario';

  constructor(private http: HttpClient) {}

  enviarFormulario(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl, data, { observe: 'response' });
  }
}


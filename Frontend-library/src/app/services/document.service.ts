import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../shaders/API';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = API.baseUrl;
  private endpoint = API.endpoints.document;

  private http = inject(HttpClient);

  // Subir documento
  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.endpoint}/upload`, formData);
  }

  // Obtener documentos con filtros
  getDocuments(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    if (filters.estado) params = params.set('estado', filters.estado);
    if (filters.categoria) params = params.set('categoria', filters.categoria);
    if (filters.asignatura) params = params.set('asignatura', filters.asignatura);
    if (filters.tipo) params = params.set('tipo', filters.tipo);
    if (filters.search) params = params.set('search', filters.search);
    if (filters.autor) params = params.set('autor', filters.autor);

    return this.http.get(`${this.baseUrl}${this.endpoint}`, { params });
  }

  // Actualizar estado (Aprobar/Rechazar)
  updateStatus(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.baseUrl}${this.endpoint}/${id}/status`, { estado });
  }

  // Descargar documento
  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}${this.endpoint}/download/${id}`, {
      responseType: 'blob'
    });
  }
}

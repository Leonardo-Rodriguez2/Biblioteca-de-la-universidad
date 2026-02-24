import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inyectamos el ID de la plataforma
  private platformId = inject(PLATFORM_ID);

  isLoggedIn(): boolean {
    // Verificamos si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token; // Retorna true si existe, false si no
    }
    
    // Si estamos en el servidor, por defecto decimos que no está logueado
    // (o manejamos la lógica de cookies si fuera necesario)
    return false;
  }
}
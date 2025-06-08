// src/app/pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeletarPedido {
    private apiUrl = 'http://localhost:3000/pedidos/delete';
    constructor(private http: HttpClient) { }

    deletarPedido(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
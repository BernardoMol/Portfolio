// src/app/pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Para usar Observables
import { Pedido } from '../interfaces/interface.pedido';


@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})

export class DetalhesPedido {
    deletarPedido(id: number) {
      throw new Error('Method not implemented.');
    }
    private apiUrl = 'http://localhost:3000/pedidos/id'; 
    constructor(private http: HttpClient) { } 

    getPedidoByID(id: number): Observable<Pedido> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get<Pedido>(url);
  }
}
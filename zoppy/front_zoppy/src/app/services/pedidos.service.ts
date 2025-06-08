// src/app/pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Para usar Observables
import { Pedido } from '../interfaces/interface.pedido';


@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})

export class PedidosService {
  private apiUrl = 'http://localhost:3000/pedidos'; // URL da sua API de pedidos

  constructor(private http: HttpClient) { } // Injeta o HttpClient

  // Método para buscar todos os pedidos
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

}
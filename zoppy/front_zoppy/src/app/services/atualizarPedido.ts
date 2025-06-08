// src/app/pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Pedido } from '../interfaces/interface.pedido';

@Injectable({
  providedIn: 'root'
})
export class AtualizarPedido {
  
  private apiURLatualizarPedido = 'http://localhost:3000/pedidos/update/id';
  private apiURLatualizarCliente = 'http://localhost:3000/clientes/update/id';

  constructor(private http: HttpClient) {}

  atualizarPedidoECliente(pedido: Pedido): Observable<any> {
    const urlPedido = `${this.apiURLatualizarPedido}/${pedido.id}`; 
    const urlCliente = `${this.apiURLatualizarCliente}/${pedido.cliente.id}`; 

    const updatePedido$ = this.http.patch(urlPedido, pedido);
    const updateCliente$ = this.http.patch(urlCliente, pedido.cliente);

    return forkJoin([updatePedido$, updateCliente$]); // mais meia hora pra lembrar que é patch e nap put =D
  }

}

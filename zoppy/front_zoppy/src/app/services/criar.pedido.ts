// src/app/pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Pedido } from '../interfaces/interface.pedido';
import { Loja } from '../interfaces/interface.loja';
import { Produto } from '../interfaces/interface.produto';
import { Cliente } from '../interfaces/interface.cliente';
import { CriarPedidoDto } from '../interfaces/interface.criar.pedido.dto';

@Injectable({
  providedIn: 'root'
})
export class CriarPedido {
  
    private apiBuscaLojas = 'http://localhost:3000/lojas/';
    private apiBuscaProdutos = 'http://localhost:3000/produtos';
    

    private apiCriaCliente = 'http://localhost:3000/clientes/add/';

    private apiCriaPedido = 'http://localhost:3000/pedidos/add';

    constructor(private http: HttpClient) {}

    criarPedido(pedido: CriarPedidoDto): Observable<Pedido> {
        return this.http.post<Pedido>(this.apiCriaPedido, pedido);
    }

    criarCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.apiCriaCliente, cliente);
    }

    getLojas(): Observable<Loja[]> {
        return this.http.get<Loja[]>(this.apiBuscaLojas);
    }

    getProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.apiBuscaProdutos);
    }

}

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { Pedido } from '../interfaces/interface.pedido';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: 'app-pagina-inicial-zoppy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-inicial-zoppy.component.html',
  styleUrl: './pagina-inicial-zoppy.component.css'
})
export class PaginaInicialZoppyComponent {
    
  pedidos: Pedido[] = [];
  
  constructor(
    private router: Router,
    private pedidosService: PedidosService
  ) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
      console.log('Tentando carregar pedidos da API:')
      this.pedidosService.getPedidos().subscribe({
        next: (data) => { // é tipo um try
          this.pedidos = data;
          console.log('Dados dos pedidos recebidos da API:', this.pedidos); 
        },
        error: (error) => {
          console.error('Erro ao carregar pedidos:', error);
        },
        complete: () => {
          console.log('Requisição de pedidos completada.');
        }
      });
    }


  // buscarTodosProdutos() {
  //   window.location.href = 'http://localhost:3000/produtos';
  // }

  // irParaPaginaInterna() {
  //   this.router.navigate(['/pagina-interna']);
  // }
    
  // MÉTODO BOTÃO
  voltarParaPaginaInicial() {
    this.router.navigate(['/'])
  }

  criarNovoPedido() {
    this.router.navigate(['criar-pedido'])
  }
}


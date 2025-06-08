
import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Pedido } from '../interfaces/interface.pedido';

import { DetalhesPedido } from '../services/detalhes.pedido'; 
import { HttpClientModule } from '@angular/common/http';
import { DeletarPedido } from '../services/deletar.pedido';
import { AtualizarPedido } from '../services/atualizarPedido';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './detalhes-pedido.component.html',
  styleUrl: './detalhes-pedido.component.css'
})
export class DetalhesPedidoComponent implements OnInit { // <-- Implementa OnInit

  pedidoId!: number;
  editando!: boolean;
  pedido: Pedido | undefined;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detalhesPedidoService: DetalhesPedido,
    private deletarPedidoService : DeletarPedido,
    private atualizarPedidoService: AtualizarPedido
  ) { }

  ngOnInit(): void { 
    this.editando = false;

    this.pedidoId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.pedidoId){
      console.log('ID do pedido recebido:', this.pedidoId);
      this.loading = true;
      this.error = null;
      this.carregarDetalhesPedido(this.pedidoId);
    }
    else{
      console.error('ID do pedido não encontrado na URL.');
      this.error = 'ID do pedido não fornecido.';
      this.loading = false;
    }  
    
    // this.route.paramMap.subscribe(params => {
    //   const pedidoIdString = params.get('id');

    //   if (pedidoIdString) {
    //     const pedidoId = +pedidoIdString;
    //     this.loading = true;
    //     this.error = null;
    //     this.carregarDetalhesPedido(pedidoId);
    //   } else {
    //     console.error('ID do pedido não encontrado na URL.');
    //     this.error = 'ID do pedido não fornecido.';
    //     this.loading = false;
    //   }
    // });

  }

  carregarDetalhesPedido(id: number): void {
    this.detalhesPedidoService.getPedidoByID(id).subscribe({
      next: (data) => {
        // tem que verificar se é array antes, ele pode ser null tb
        if (Array.isArray(data) && data.length > 0) {
          this.pedido = data[0]; // Pega o primeiro objeto do array (é pra vir so 1 mesmo.....)
        } else {
          this.error = 'Pedido não encontrado ou dados inválidos.';
        }
        this.loading = false;
        console.log('Detalhes do pedido recebidos:', this.pedido); // Vai logar o objeto Pedido individual
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do pedido:', err);
        this.error = 'Não foi possível carregar os detalhes do pedido. Tente novamente mais tarde.';
        this.loading = false;
      }
    });
  }

  voltarParaPaginaAnterior(): void {
    this.router.navigate(['/pagina-inicial-zoppy']);
  }

  editarPedido(): void {
    this.editando = true;
  }

  salvarAlteracoes(): void {
    if (this.pedido) {
      this.atualizarPedidoService.atualizarPedidoECliente(this.pedido).subscribe({
        next: () => {
          this.editando = false;
          alert('Pedido atualizado com sucesso!');
        },
        error: () => {
          this.error = 'Erro ao atualizar o pedido.';
        }
      });
    }
  }

  deletarPedido(): void {
    if (this.pedido && confirm('Tem certeza que deseja deletar este pedido? Esta ação não pode ser desfeita.')) {
      this.loading = true;
      this.error = null;

      this.deletarPedidoService.deletarPedido(this.pedido.id).subscribe({
        next: (response: any) => {
          this.loading = false;
          this.router.navigate(['/pagina-inicial-zoppy']);
        },
        error: (err) => {
          this.error = 'Não foi possível deletar o pedido. Por favor, tente novamente.';
          this.loading = false;
        }
      });
    } else if (!this.pedido) {
      this.error = 'Não há pedido para deletar.';
    }
  }

}
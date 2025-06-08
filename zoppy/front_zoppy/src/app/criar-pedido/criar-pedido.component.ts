import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pedido } from '../interfaces/interface.pedido';
import { CriarPedido } from '../services/criar.pedido';
import { Loja } from '../interfaces/interface.loja';
import { Produto } from '../interfaces/interface.produto';
import { Cliente } from '../interfaces/interface.cliente';
import { switchMap } from 'rxjs/operators';
import { CriarPedidoDto } from '../interfaces/interface.criar.pedido.dto';

@Component({
  selector: 'app-criar-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './criar-pedido.component.html',
  styleUrl: './criar-pedido.component.css'
})
export class CriarPedidoComponent implements OnInit {

  novoPedido: Pedido; // Mantém a interface Pedido original

  lojas: Loja[] = [];
  produtos: Produto[] = [];

  loadingLojas: boolean = true;
  loadingProdutos: boolean = true;
  errorLojas: string | null = null;
  errorProdutos: string | null = null;

  loading: boolean = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private criarPedidoService: CriarPedido
  ) {
    this.novoPedido = {
      id: 0,
      DataDoPedido: new Date(),
      DataPrevistaEntrega: new Date(),
      EnderecoEntrega: '',
      Entregue: false,
      cliente: { // Mantém a estrutura Cliente para o formulário e criação
        id: 0,
        NomeCliente: '',
        EmailCliente: '',
        EnderecoCliente: '',
        FotoCliente: ''
      },
      loja: { // Mantém a estrutura Loja
        id: 0,
        NomeLoja: '',
        EnderecoLoja: '',
        FotoLoja: ''
      },
      produtos: [] // Mantém a estrutura Produtos
    };
  }

  ngOnInit(): void {
    this.criarPedidoService.getLojas().subscribe({
      next: (data) => {
        this.lojas = data;
        console.log('LOJAS carregadas:', this.lojas);
        console.log('Tipo do primeiro ID de loja:', typeof this.lojas[0]?.id);
      },
      error: (err) => {
        console.error('Erro ao carregar LOJAS:', err);
        this.errorLojas = 'Erro ao carregar lojas. Por favor, tente novamente.';
      },
      complete: () => {
        this.loadingLojas = false;
      }
    });

    this.criarPedidoService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        console.log('PRODUTOS carregados:', this.produtos);
      },
      error: (err) => {
        console.error('Erro ao carregar PRODUTOS:', err);
        this.errorProdutos = 'Erro ao carregar produtos. Por favor, tente novamente.';
      },
      complete: () => {
        this.loadingProdutos = false;
      }
    });
  }

  selecionarLoja(lojaId: number): void {
    const lojaSelecionada = this.lojas.find(l => l.id === lojaId);
    if (lojaSelecionada) {
      this.novoPedido.loja = { ...lojaSelecionada };
    } else {
      this.novoPedido.loja = {
        id: 0,
        NomeLoja: '',
        EnderecoLoja: '',
        FotoLoja: ''
      };
    }
  }

  adicionarProdutoSelecionado(produtoId: string): void {
    const selectedProductId = parseInt(produtoId, 10);

    const produtoJaNoPedido = this.novoPedido.produtos.find(p => p.id === selectedProductId);
    if (produtoJaNoPedido) {
      alert('Este produto já foi adicionado ao pedido.');
      return;
    }

    const produtoEncontrado = this.produtos.find(p => p.id === selectedProductId);

    if (produtoEncontrado) {
      this.novoPedido.produtos.push({
        id: produtoEncontrado.id,
        NomeProduto: produtoEncontrado.NomeProduto,
        Estoque: 1, // Assumindo quantidade inicial de 1
        Valor: produtoEncontrado.Valor
      });
    }
  }

  removerProduto(index: number): void {
    this.novoPedido.produtos.splice(index, 1);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.novoPedido.cliente.FotoCliente = reader.result as string;
        console.log('Foto convertida para Base64:', this.novoPedido.cliente.FotoCliente.substring(0, 50) + '...');
      };
      reader.readAsDataURL(file);
    }
  }

  criarPedido(): void {
    this.loading = true;
    this.error = null;

    // 1. Chamar o serviço para criar o cliente
    this.criarPedidoService.criarCliente(this.novoPedido.cliente).pipe(
      switchMap((clienteCriadoResponse: any) => {
        // Extrair o objeto Cliente real da propriedade 'data' da resposta do backend
        const clienteRealCriado: Cliente = clienteCriadoResponse.data; 
        
        console.log('--- DEPURANDO CLIENTE PARA O PEDIDO (APÓS CRIAÇÃO NO BACKEND) ---');
        console.log('CLIENTE CRIADO (objeto completo da resposta do backend):', clienteCriadoResponse);
        console.log('ID do CLIENTE CRIADO (extraído da resposta):', clienteRealCriado.id);
        
        // Opcional: Atualizar o objeto cliente dentro do novoPedido COM O ID
        this.novoPedido.cliente = clienteRealCriado;
        
        // Opcional: Atualizar o EnderecoEntrega com base no cliente criado
        this.novoPedido.EnderecoEntrega = clienteRealCriado.EnderecoCliente;

        // 2. Construir o DTO de envio para o Backend com APENAS os IDs
        const pedidoParaBackend: CriarPedidoDto = {
          DataDoPedido: this.novoPedido.DataDoPedido,
          DataPrevistaEntrega: this.novoPedido.DataPrevistaEntrega,
          EnderecoEntrega: this.novoPedido.EnderecoEntrega,
          Entregue: this.novoPedido.Entregue,
          clienteId: clienteRealCriado.id!, // Use o ID do cliente recém-criado
          lojaId: this.novoPedido.loja.id!, // Use o ID da loja selecionada
          produtoIds: this.novoPedido.produtos.map(p => p.id!) // Mapeie apenas os IDs dos produtos
        };

        console.log('PEDIDO COM CLIENTE (ANTES DE ENVIAR PARA CRIAR PEDIDO NO BACKEND):', this.novoPedido); // Para sua referência
        console.log('DTO SENDO ENVIADO PARA O BACKEND:', pedidoParaBackend); // <--- ESTE É O OBJETO QUE O BACKEND RECEBE

        // 3. Chamar o serviço para criar o pedido, passando o DTO de ENVIO
        return this.criarPedidoService.criarPedido(pedidoParaBackend);
      })
    ).subscribe({
      next: (pedidoCriado: Pedido) => {
        console.log('CLIENTE PASSADO PARA O PEDIDO (RESPOSTA FINAL DO BACKEND):', pedidoCriado.cliente);
        console.log('Cliente e Pedido criados com sucesso!', pedidoCriado);
        this.loading = false;
        this.router.navigate(['/pagina-inicial-zoppy']);
      },
      error: (err) => {
        console.error('Erro ao criar cliente ou pedido:', err);
        this.loading = false;
        this.error = 'Não foi possível criar o cliente ou o pedido. Verifique os dados e tente novamente.';
      }
    });
  }

  adicionarProduto(): void {
    this.novoPedido.produtos.push({
      id: 0,
      NomeProduto: '',
      Estoque: 0,
      Valor: 0.0
    });
  }

  cancelar(): void {
    this.router.navigate(['/pagina-inicial-zoppy']);
  }
}
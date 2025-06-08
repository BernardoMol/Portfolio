import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Loja } from 'src/loja/entities/loja.entity';

@Injectable()
export class PedidosService {
  // clienteRepository: any;
  // lojaRepository: any;
  // produtoRepository: any;
  
  constructor(
    @InjectRepository(Pedido)
      private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Cliente)
      private clienteRepository: Repository<Cliente>,
    @InjectRepository(Loja)
      private lojaRepository: Repository<Loja>,
    @InjectRepository(Produto)
      private produtoRepository: Repository<Produto>,
  ) {}

  findAll() {
    return this.pedidoRepository.find({relations: ['cliente', 'loja', 'produtos']});
  }

  findOneByID(id: number) {
    return this.pedidoRepository.find({ where: { id }, 
      relations: ['cliente', 'loja', 'produtos'], // Inclui as relações que você quer carregar
    })
  }

  async create(createPedidoDto: CreatePedidoDto) {
    const { 
      DataDoPedido, 
      DataPrevistaEntrega, 
      // EnderecoEntrega, 
      Entregue,
      clienteId, 
      lojaId, 
      produtoIds,} = createPedidoDto;

    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }
    
    var EnderecoEntrega = cliente.EnderecoCliente; 

    const loja = await this.lojaRepository.findOne({ where: { id: lojaId } });
    if (!loja) {
      throw new NotFoundException(`Loja com ID ${lojaId} não encontrada.`);
    }

    let produtos: Produto[] = [];
    if (produtoIds && produtoIds.length > 0) {
      produtos = await this.produtoRepository.findByIds(produtoIds); 
      if (produtos.length !== produtoIds.length) {
        const foundIds = produtos.map(p => p.id);
        const missingIds = produtoIds.filter(id => !foundIds.includes(id));
        if (missingIds.length > 0) {
          throw new NotFoundException(`Produtos com IDs ${missingIds.join(', ')} não encontrados.`);
        }
      }
    }
    
    const pedido = this.pedidoRepository.create({
      DataDoPedido, 
      DataPrevistaEntrega, 
      Entregue,
      cliente, // meia hora pra entender que eu tava passando ID e nao so objetos....ai é triste....
      EnderecoEntrega,
      loja, 
      produtos,
    });

    return this.pedidoRepository.save(pedido);
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const {
      DataPrevistaEntrega,
      Entregue,
      clienteId, 
      lojaId,    
      produtoIds, 
    } = updatePedidoDto;

    const pedido = await this.pedidoRepository.findOne({ where: { id: id }, relations: ['cliente', 'loja', 'produtos'] });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }
    
    var EnderecoEntrega = cliente.EnderecoCliente; 

    const loja = await this.lojaRepository.findOne({ where: { id: lojaId } });
    if (!loja) {
      throw new NotFoundException(`Loja com ID ${lojaId} não encontrada.`);
    }

    let produtos: Produto[] = [];
    if (produtoIds && produtoIds.length > 0) {
      produtos = await this.produtoRepository.findByIds(produtoIds); 
      if (produtos.length !== produtoIds.length) {
        const foundIds = produtos.map(p => p.id);
        const missingIds = produtoIds.filter(id => !foundIds.includes(id));
        if (missingIds.length > 0) {
          throw new NotFoundException(`Produtos com IDs ${missingIds.join(', ')} não encontrados.`);
        }
      }
    }

    // a atualizalção é uma MESCLA.....doidera....
    this.pedidoRepository.merge(pedido, {
        DataPrevistaEntrega,
        Entregue,
        cliente, 
        loja,    
        EnderecoEntrega, 
        produtos, 
    });

    const salvo = await this.pedidoRepository.save(pedido); 

    return {
      message: 'PEDIDO Alterado!',
      data: salvo,
    };
  }


  async remove(id: number) {
    const pedido = await this.pedidoRepository.findOne({ where: { id: id } });
    if (!pedido) {
      throw new Error(`Pedido com ID ${id} não encontrado`);
    }
    await this.pedidoRepository.remove(pedido);
    return {
      message: 'PEDIDO DELETADO!',
      data: pedido,
    };
  }
}

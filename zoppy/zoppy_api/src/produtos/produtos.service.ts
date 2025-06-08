import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutosService {

  constructor(
  @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  findAll() {
    return this.produtoRepository.find();
  }

  findOnebyID(id: number) {
    return this.produtoRepository.find({ where: { id } })
  }

  findOnebyName(NomeProduto: string) {
    return this.produtoRepository.find({ where: { NomeProduto } })
  }

  create(createProdutoDto: CreateProdutoDto) {
    const produto = this.produtoRepository.create(createProdutoDto);
    this.produtoRepository.save(produto);
    return {
      message: 'PRODUTO CRIADO !',
      data: produto,
    };
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    // NÃO FUNCIONA PORQUE NÃO ME DEVOLVE O OBJETO
    // const produto = this.produtoRepository.findOne({ where: { id } })
    // if (!produto) {
    //   throw new Error(`Produto com ID ${id} não encontrado`);
    // }
    // não quis usar o then
    const produto = await this.produtoRepository.findOne({ where: { id: id } });
    if (!produto) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }

    const produtoAtualizado = this.produtoRepository.merge(produto, updateProdutoDto);
    const salvo = await this.produtoRepository.save(produtoAtualizado)
    
    return {
      message: 'Alterado por ID!',
      data: salvo,
    }

  }; 

  updateByName(nomeProduto: string, updateProdutoDto: UpdateProdutoDto) {
    
    // Não curti, vou precisar de mais pratica para pegar essa forma
    return this.produtoRepository.findOne({ where: { NomeProduto: nomeProduto } }).then( produto => {
      if (!produto) {
        throw new Error(`Produto ${nomeProduto} não encontrado`);
      }
    
      const produtoAtualizado = this.produtoRepository.merge(produto, updateProdutoDto);
      return this.produtoRepository.save(produtoAtualizado).then(salvo => ({
        message: 'Alterado pelo NOME!',
        data: salvo,
      }));
    
    });
    
  }

  async remove(id: number) {
    const produto = await this.produtoRepository.findOne({ where: { id: id } });
    if (!produto) {
      throw new Error(`Pedido com ID ${id} não encontrado`);
    }
    this.produtoRepository.remove(produto);
    return {
      message: 'PRODUTO DELETADO !',
      data: produto,
    };
  }
}

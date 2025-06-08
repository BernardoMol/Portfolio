import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientesService {
  
  constructor(
    @InjectRepository(Cliente)
      private clienteRepository: Repository<Cliente>,
  ) {}

  findAll() {
    return this.clienteRepository.find();
  }

  findOnebyID(id: number) {
    return this.clienteRepository.find({ where: { id }, 
      relations: ['pedidos']
    })
  }

  findOnebyName(NomeCliente: string) {
    return this.clienteRepository.find({ where: { NomeCliente }, 
      relations: ['pedidos']
    })
  }

  async create(createClienteDto: CreateClienteDto) {

    const cliente = this.clienteRepository.create(createClienteDto);
    await this.clienteRepository.save(cliente);

    console.log('----------------------------------------------------');
    console.log('Requisição de CRIAÇÃO DE PEDIDO RECEBIDA no BACKEND:');
    console.log('CLIENTE CRIADO (back) !!!:', createClienteDto); 

    return {
      message: 'CLIENTE CRIADO !',
      data: cliente,
    };
  }


  async updateByID(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOne({ where: { id: id } });
    if (!cliente) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }

    const produtoAtualizado = this.clienteRepository.merge(cliente, updateClienteDto);
    const salvo = await this.clienteRepository.save(produtoAtualizado)
    
    return {
      message: 'Alterado por ID!',
      data: salvo,
    }

  }; 

  updateByName(nomeCliente: string, updateClienteDto: UpdateClienteDto) {
      return this.clienteRepository.findOne({ where: { NomeCliente: nomeCliente } }).then( cliente => {
      if (!cliente) {
        throw new Error(`CLIENTE ${nomeCliente} não encontrado`);
      }
    
      const produtoAtualizado = this.clienteRepository.merge(cliente, updateClienteDto);
      return this.clienteRepository.save(produtoAtualizado).then(salvo => ({
        message: 'Alterado pelo NOME!',
        data: salvo,
      }));
    
    });
  }

  async remove(id: number) {
    const cliente = await this.clienteRepository.findOne({ where: { id: id } });
    if (!cliente) {
      throw new Error(`CLIENTE com ID ${id} não encontrado`);
    }
    this.clienteRepository.remove(cliente);
    return {
      message: 'CLIENTE DELETADO !',
      data: cliente,
    };
  }
}

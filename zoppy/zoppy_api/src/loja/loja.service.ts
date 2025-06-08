import { Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loja } from './entities/loja.entity';

@Injectable()
export class LojaService {
  
  constructor(
    @InjectRepository(Loja)
      private lojaRepository: Repository<Loja>,
  ) {}

  findAll() {
    return this.lojaRepository.find();
  }

  findOneByID(id: number) {
    return this.lojaRepository.find({ where: { id }, 
    relations: ['produtos','pedidos']
    });
  }

  findOnebyName(NomeLoja: string) {
    return this.lojaRepository.find({ where: { NomeLoja } })
  }

  create(createLojaDto: CreateLojaDto) {
    const loja = this.lojaRepository.create(createLojaDto);
    this.lojaRepository.save(loja);
    return {
      message: 'LOJA CRIADA !',
      data: loja,
    };
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    const loja = await this.lojaRepository.findOne({ where: { id: id } });
    if (!loja) {
      throw new Error(`LOJA com ID ${id} não encontrado`);
    }

    const produtoAtualizado = this.lojaRepository.merge(loja, updateLojaDto);
    const salvo = await this.lojaRepository.save(produtoAtualizado)

    return {
      message: 'LOJA ATUALIZADA !',
      data: salvo,
    };
  }

  async remove(id: number) {
    const loja = await this.lojaRepository.findOne({ where: { id: id } });
    if (!loja) {
      throw new Error(`LOJA com ID ${id} não encontrado`);
    }
    this.lojaRepository.remove(loja);
    return {
      message: 'LOJA DELETADA !',
      data: loja,
    };
  }
}

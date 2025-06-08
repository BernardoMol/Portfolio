import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get('id/:id')
  findOnebyID(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException('ID inválido');
    }    
    return this.produtosService.findOnebyID(+id);
  }

  @Get('nome/:nome')
  findOnebyName(@Param('nome') nome: string) {
    return this.produtosService.findOnebyName(nome);
  }

  @Post('add')
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Patch('update/id/:id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Patch('update/nome/:nome')
  updatebyName(@Param('nome') nome: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.updateByName(nome, updateProdutoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}

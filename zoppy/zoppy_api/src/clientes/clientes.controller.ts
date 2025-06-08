import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get('id/:id')
  findOnebyID(@Param('id') id: string) {
    return this.clientesService.findOnebyID(+id);
  }

  @Get('nome/:nome')
  findOnebyName(@Param('nome') nome: string) {
    return this.clientesService.findOnebyName(nome);
  }

  @Post('add')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Patch('update/id/:id')
  updateByID(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.updateByID(+id, updateClienteDto);
  }

  @Patch('update/nome/:nome')
  updateByName(@Param('nome') nome: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.updateByName(nome, updateClienteDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Controller('lojas')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Get()
  findAll() {
    return this.lojaService.findAll();
  }

  @Get('id/:id')
  findOneByID(@Param('id') id: string) {
    return this.lojaService.findOneByID(+id);
  }

  @Post('add')
  create(@Body() createLojaDto: CreateLojaDto) {
    return this.lojaService.create(createLojaDto);
  }

  @Patch('update/id/:id')
  update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojaService.update(+id, updateLojaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.lojaService.remove(+id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { Cliente } from '../clientes/entities/cliente.entity'; // Certifique-se que esta importação está correta
import { Loja } from '../loja/entities/loja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ // essas interrelações pedem muita coisa C ta doido
      Pedido,
      Produto,
      Cliente, 
      Loja
    ])
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService]
})
export class PedidosModule {}

// import { Module } from '@nestjs/common';
// import { PedidosService } from './pedidos.service';
// import { PedidosController } from './pedidos.controller';

// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Pedido } from './entities/pedido.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([Pedido])],
//   controllers: [PedidosController],
//   providers: [PedidosService],
// })
// export class PedidosModule {}

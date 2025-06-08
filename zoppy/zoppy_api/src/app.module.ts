import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { LojaModule } from './loja/loja.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'gondola.proxy.rlwy.net',
      port: 24543,
      username: 'root',
      password: 'XtuUKTsBbqzSjNFOqiQkNfmsiIuSvSPJ',
      database: 'railway',
      // Caminho para suas entidades. '__dirname' é o diretório do 'app.module.ts'.
      // O '..' volta um nível para a raiz do 'src', e '**/*.entity{.ts,.js}'
      // busca por qualquer arquivo .entity.ts ou .entity.js nas subpastas.
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // MUITO IMPORTANTE: synchronize: false para produção!
      // Isso impede que o TypeORM altere automaticamente o seu banco de dados
      // e força o uso de migrations para controle do esquema.
      synchronize: false, 
      // migrationsRun: false está correto, você vai rodar as migrations manualmente.
      migrationsRun: false,
      migrationsTableName: 'typeorm_migrations',
      // Caminho para suas migrations (aponta para os arquivos JS compilados na pasta 'dist').
      migrations: ['dist/database/migrations/*.js'], 
    }),
    ProdutosModule,
    ClientesModule,
    PedidosModule,
    LojaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
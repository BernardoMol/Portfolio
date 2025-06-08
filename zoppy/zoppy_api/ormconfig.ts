import { DataSource } from 'typeorm'; 
import { Cliente } from './src/clientes/entities/cliente.entity';
import { Loja } from './src/loja/entities/loja.entity';
import { Pedido } from './src/pedidos/entities/pedido.entity';
import { Produto } from './src/produtos/entities/produto.entity';

// Crie uma instância de DataSource com suas configurações
const AppDataSource = new DataSource({ 
  type: 'mysql',
  host: 'gondola.proxy.rlwy.net',
  port: 24543,
  username: 'root',
  password: 'XtuUKTsBbqzSjNFOqiQkNfmsiIuSvSPJ',
  database: 'railway',
  entities: [
    Cliente,
    Loja,
    Pedido,
    Produto,
  ],
  migrations: [__dirname + '/database/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource; 
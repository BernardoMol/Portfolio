import { Loja } from '../../loja/entities/loja.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('Produtos') // é aqui que o nome da tabela entra !!!! boa!!!!
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  NomeProduto: string;
  @Column('integer')
  Estoque: number;
  @Column('decimal', { precision: 10, scale: 2 })
  Valor: number;

  // UM PRODUTO PODE ESTAR EM VARIOS PEDIDOS E UM PEDIDO PODE CONTER VARIOS PRODUTOS
  @ManyToMany(() => Pedido, (pedido) => pedido.produtos)
  pedidos: Pedido[];

  // UM PRODUTO PODE ESTAR EM VÁRIAS LOJAS E UMA LOJA PODE CONTER VARIOS PRODUTOS
  @ManyToMany(() => Loja, (loja) => loja.produtos)
  lojas: Loja[];

}
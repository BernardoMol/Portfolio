
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Loja } from '../../loja/entities/loja.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Pedidos') // é aqui que o nome da tabela entra !!!! boa!!!!
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('date')
  DataDoPedido: Date;
  @Column('date')
  DataPrevistaEntrega: Date;
  @Column()
  EnderecoEntrega: string;
  @Column('boolean')
  Entregue: boolean;


  // UM PEDIDO SO PODE TER UM CLIENTE, MAS VARIOS PEDIDOS PODEM TER ESTE MESMO CLIENTE
  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos) // Muitos pedidos para um cliente
  @JoinColumn({ name: 'clienteId' }) // Nome da coluna da chave estrangeira na tabela Pedidos
  cliente: Cliente;

  // UM PEDIDO SO PODE TER UMA LOJA, MAS VARIOS PEDIDOS PODEM TER ESTA MESMA LOJA
  @ManyToOne(() => Loja, (loja) => loja.pedidos) 
  @JoinColumn({ name: 'lojaId' }) 
  loja: Loja;

  // UM PEDIDO PODE TER MUITOS PRODUTOS E CADA PRODUTO PODE SER ASSOCIADO A VARIOS PEDIDOS
  @ManyToMany(() => Produto, (produto) => produto.pedidos)
  @JoinTable({
    name: 'pedido_produto', // Nome da tabela de junção
    joinColumn: {
      name: 'pedidoId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'produtoId',
      referencedColumnName: 'id',
    },
  })
  produtos: Produto[];
 
}
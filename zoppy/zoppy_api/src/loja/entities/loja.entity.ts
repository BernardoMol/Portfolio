import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('Lojas') // é aqui que o nome da tabela entra !!!! boa!!!!
export class Loja {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  NomeLoja: string;
  @Column()
  EnderecoLoja: string;
  @Column({ type: 'longtext', nullable: true })
  FotoLoja: string;

  // UMA LOJA PODE TER VARIOS PEDIDOS, MAS UM PEDIO SO PODE TER UMA LOJA
  @OneToMany(() => Pedido, (pedido) => pedido.loja) // Uma loja tem muitos pedidos
  pedidos: Pedido[];

  // UMA LOJA PODE TER MUITOS PRODUTOS E UM PRODUTO PODE PERTENCER A VARIAS LOJAS
  @ManyToMany(() => Produto, (produto) => produto.lojas)
  @JoinTable({
    name: 'loja_produto', // Nome da tabela de junção
    joinColumn: {
      name: 'lojaId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'produtoId',
      referencedColumnName: 'id',
    },
  })
  produtos: Produto[];
}
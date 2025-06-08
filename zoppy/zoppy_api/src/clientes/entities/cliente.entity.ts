import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('Clientes') // é aqui que o nome da tabela entra !!!! boa!!!!
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  NomeCliente: string;
  @Column()
  EmailCliente: string;
  @Column()
  EnderecoCliente: string;
  @Column({ type: 'longtext', nullable: true })
  FotoCliente: string;

  // UM CLIENTE para MUITOS PEDIDOS, mas UM PEDIDO SO PODE TER UM CLIENTE
  @OneToMany(() => Pedido, (pedidosCliente) => pedidosCliente.cliente) // Um cliente tem muitos pedidos
  pedidos: Pedido[];
}
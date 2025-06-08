import { Cliente } from "./interface.cliente";
import { Loja } from "./interface.loja";
import { Produto } from "./interface.produto";

export interface Pedido {
  id: number;
  DataDoPedido: Date;
  DataPrevistaEntrega: Date; 
  EnderecoEntrega: string;
  Entregue: boolean;
  cliente: Cliente; 
  loja: Loja;       
  produtos: Produto[]; 
}
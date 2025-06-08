
export class CreatePedidoDto {
  DataDoPedido: Date;
  DataPrevistaEntrega: Date;
  EnderecoEntrega: string;
  Entregue: boolean;
  clienteId: number; 
  lojaId: number; 
  produtoIds?: number[]; 
}


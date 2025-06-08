export interface CriarPedidoDto {
  DataDoPedido: Date;
  DataPrevistaEntrega: Date;
  EnderecoEntrega: string; // Manter se você ainda envia isso
  Entregue: boolean;
  
  clienteId: number;   // Apenas o ID do cliente
  lojaId: number;      // Apenas o ID da loja
  produtoIds: number[]; // Apenas os IDs dos produtos
}
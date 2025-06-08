import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component'; 
import { PaginaInicialZoppyComponent } from './pagina-inicial-zoppy/pagina-inicial-zoppy.component';
import { DetalhesPedidoComponent } from './detalhes-pedido/detalhes-pedido.component';
import { CriarPedidoComponent } from './criar-pedido/criar-pedido.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'pagina-inicial-zoppy', component: PaginaInicialZoppyComponent },
  { path: 'detalhes-pedido/:id', component: DetalhesPedidoComponent },  
  { path: 'criar-pedido', component: CriarPedidoComponent },  
  { path: '**', redirectTo: '' } 
];


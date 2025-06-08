import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})

export class PaginaInicialComponent {
  constructor(private router: Router) { }

  irParaProjetoZoppy() {
    this.router.navigate(['/pagina-inicial-zoppy'])
  }
  irParaTrecco() {
    window.location.href = 'https://trecco.vercel.app';
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialZoppyComponent } from './pagina-inicial-zoppy.component';

describe('PaginaInicialZoppyComponent', () => {
  let component: PaginaInicialZoppyComponent;
  let fixture: ComponentFixture<PaginaInicialZoppyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaInicialZoppyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaInicialZoppyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

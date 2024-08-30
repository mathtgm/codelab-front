import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaConsultaComponent } from './venda-consulta.component';

describe('VendaConsultaComponent', () => {
  let component: VendaConsultaComponent;
  let fixture: ComponentFixture<VendaConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendaConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

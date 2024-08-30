import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaCadastroComponent } from './venda-cadastro.component';

describe('VendaCadastroComponent', () => {
  let component: VendaCadastroComponent;
  let fixture: ComponentFixture<VendaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendaCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

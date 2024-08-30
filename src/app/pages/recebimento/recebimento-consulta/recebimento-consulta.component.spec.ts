import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecebimentoConsultaComponent } from './recebimento-consulta.component';

describe('RecebimentoConsultaComponent', () => {
  let component: RecebimentoConsultaComponent;
  let fixture: ComponentFixture<RecebimentoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecebimentoConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecebimentoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

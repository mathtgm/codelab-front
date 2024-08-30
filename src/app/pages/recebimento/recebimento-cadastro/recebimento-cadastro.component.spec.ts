import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecebimentoCadastroComponent } from './recebimento-cadastro.component';

describe('RecebimentoCadastroComponent', () => {
  let component: RecebimentoCadastroComponent;
  let fixture: ComponentFixture<RecebimentoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecebimentoCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecebimentoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

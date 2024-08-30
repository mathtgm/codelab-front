import { Component, Injector, OnDestroy } from '@angular/core';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { IVenda } from '../venda.interface';
import { SaveActionComponent } from '../../../shared/components/action-bar/save-action/save-action.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { SaveAddActionComponent } from '../../../shared/components/action-bar/save-add-action/save-add-action.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { VendaService } from '../venda.service';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { debounceTime, tap, Subscription } from 'rxjs';
import { PessoaService } from '../../pessoa/pessoa.service';
import { LoginService } from '../../../login/login.service';

const actions = [
  BackActionComponent,
  SaveActionComponent,
  SaveAddActionComponent,
  MatCheckboxModule,
];

@Component({
  selector: 'cl-venda-cadastro',
  standalone: true,
  imports: [
    ...actions,
    PageLayoutComponent,
    FormFieldsListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './venda-cadastro.component.html',
  styleUrl: './venda-cadastro.component.scss'
})
export class VendaCadastroComponent extends BaseCadastroComponent<IVenda> {

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    idPessoa: new FormControl(null, [Validators.required]),
    pessoa: new FormControl({ value: '', disabled: true }),
    idUsuarioLancamento: new FormControl(this._loginService.currentUser!.id),
    valorTotal: new FormControl(null, [Validators.required]),
    pago: new FormControl({ value: false, disabled: true }),
    baixa: new FormArray([]) 
  });

  cadastroFields: IFormField[] = [
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Código',
      formControlName: 'id',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Cod. pessoa',
      formControlName: 'idPessoa',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Nome pessoa',
      formControlName: 'pessoa',
      placeholder: 'Ex.: jose@email.com',
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Valor total (R$)',
      formControlName: 'valorTotal',
      placeholder: '',
    },
    {
      type: EFieldType.Checkbox,
      class: 'grid-1',
      label: 'Pago?',
      formControlName: 'pago',
      placeholder: '',
    },
  ];

  constructor(
    private readonly _vendaService: VendaService,
    private readonly _loginService: LoginService,
    private readonly _pessoaService: PessoaService,
    protected override readonly _injector: Injector,
  ) {
    super(_vendaService, _injector);
    this.updateFormControlPessoa();
  }

  updateFormControlPessoa() {
    return this.cadastroForm.get('idPessoa')?.valueChanges.pipe(
      debounceTime(1000),
      tap(async (value) => {
        this._pessoaService.findOneById(value!).pipe(tap((value) => {
          if (value.data) {
            let { nome } = value.data;
            this.cadastroForm.get('pessoa')!.setValue(nome);
          }
        })).subscribe();
      }),
    )
      .subscribe();
  }




}
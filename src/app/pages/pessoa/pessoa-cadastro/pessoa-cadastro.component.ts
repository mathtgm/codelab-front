import { Component, Injector } from '@angular/core';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { IPessoa } from '../pessoa.interface';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { PessoaService } from '../pessoa.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { SaveActionComponent } from '../../../shared/components/action-bar/save-action/save-action.component';
import { SaveAddActionComponent } from '../../../shared/components/action-bar/save-add-action/save-add-action.component';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { cepMask, intMask } from '../../../shared/masks/masks';

const actions = [
  BackActionComponent,
  SaveActionComponent,
  SaveAddActionComponent,
];

const mat = [
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
]

@Component({
  selector: 'cl-pessoa-cadastro',
  standalone: true,
  imports: [
    ...actions,
    ...mat,
    PageLayoutComponent,
    FormFieldsListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.scss'
})
export class PessoaCadastroComponent extends BaseCadastroComponent<IPessoa> {

  constructor(private readonly _pessoaService: PessoaService, protected override readonly _injector: Injector) {
    super(_pessoaService, _injector);
  }

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
      class: 'grid-2',
      label: 'Nome',
      formControlName: 'nome',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Documento',
      formControlName: 'documento',
      placeholder: '',
      mask: intMask
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'CEP',
      formControlName: 'cep',
      placeholder: '',
      mask: cepMask
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Endereço',
      formControlName: 'endereco',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Telefone',
      formControlName: 'telefone',
      placeholder: '',
      mask: intMask
    },
    {
      type: EFieldType.Checkbox,
      class: 'grid-2',
      label: 'Ativo?',
      formControlName: 'ativo',
      placeholder: '',
    },
  ];

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    nome: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    documento: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
    cep: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    endereco: new FormControl(Validators.required),
    telefone: new FormControl(null, [Validators.required, Validators.maxLength(14)]),
    ativo: new FormControl(null)
  });

}

import { Component, Injector } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { SaveActionComponent } from '../../../shared/components/action-bar/save-action/save-action.component';
import { SaveAddActionComponent } from '../../../shared/components/action-bar/save-add-action/save-add-action.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { IRecebimento } from '../recebimento.interface';
import { RecebimentoService } from '../recebimento.service';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';

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
  MatListModule,
  MatInputModule,
  MatFormFieldModule
]

@Component({
  selector: 'cl-recebimento-cadastro',
  standalone: true,
  imports: [
    ...mat,
    ...actions,
    PageLayoutComponent,
    FormFieldsListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recebimento-cadastro.component.html',
  styleUrl: './recebimento-cadastro.component.scss'
})
export class RecebimentoCadastroComponent extends BaseCadastroComponent<IRecebimento>{

  constructor(private readonly _recebimentoService: RecebimentoService, protected override readonly _injector: Injector) {
    super(_recebimentoService, _injector);
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
      label: 'Cod. Venda',
      formControlName: 'idContaReceber',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Cod. Usuário baixa',
      formControlName: 'idUsuarioBaixa',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Valor Pago (R$)',
      formControlName: 'valorPago',
      placeholder: '',
    }
  ];

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    idContaReceber: new FormControl(null, [Validators.required]),
    idUsuarioBaixa: new FormControl(null, [Validators.required]),
    valorPago: new FormControl(null, [Validators.required]),
    dataHora: new FormControl(new Date())
  });

}

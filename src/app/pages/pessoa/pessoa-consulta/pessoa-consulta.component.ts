import { Component, Injector } from '@angular/core';
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { IPessoa } from '../pessoa.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { IFormField, ILabelValue } from '../../../shared/interfaces/form-field.interface';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { cepMask, intMask } from '../../../shared/masks/masks';
import { PessoaService } from '../pessoa.service';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddActionComponent } from '../../../shared/components/action-bar/add-action/add-action.component';
import { EmptyRowComponent } from '../../../shared/components/empty-row/empty-row.component';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { ProgressLoadingComponent } from '../../../shared/components/progress-loading/progress-loading.component';
import { BoolToTextPipe } from '../../../shared/pipes/bool-to-text.pipe';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';

const actions = [BackActionComponent, AddActionComponent];
const table = [MatTableModule, MatSortModule, MatPaginatorModule];
const pipes = [BoolToTextPipe, FormatIdPipe];
const imports = [
  ...actions,
  ...table,
  ...pipes,
  EmptyRowComponent,
  PageLayoutComponent,
  FormFieldsListComponent,
  ProgressLoadingComponent,
  CommonModule,
  MatIconModule,
];

@Component({
  selector: 'cl-pessoa-consulta',
  standalone: true,
  imports: [...imports],
  templateUrl: './pessoa-consulta.component.html',
  styleUrl: './pessoa-consulta.component.scss'
})
export class PessoaConsultaComponent extends BaseConsultaComponent<IPessoa> {

  displayedColumns: string[] = ['id', 'nome', 'documento', 'cep', 'endereco', 'telefone', 'ativo', 'acoes'];

  ativoOptions: ILabelValue[] = [
    {
      label: 'Todos',
      value: 0,
    },
    {
      label: 'Sim',
      value: true,
    },
    {
      label: 'Não',
      value: false,
    },
  ];

  filterFields: IFormField[] = [
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Código',
      formControlName: 'id',
      placeholder: 'Ex.: 1',
      mask: intMask,
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Nome',
      formControlName: 'nome',
      placeholder: 'Ex.: Roberto Silva',
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
      placeholder: 'Ex.: 13607-187',
      mask: cepMask
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Endereço',
      formControlName: 'endereco',
      placeholder: 'Ex.: R. Narciso Gonçalves, 59 - Cidade Universitária I',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Telefone',
      formControlName: 'telefone',
      placeholder: 'Ex.: 1934427600',
      mask: intMask
    },
    {
      type: EFieldType.Select,
      class: 'grid-1',
      label: 'Ativo?',
      formControlName: 'ativo',
      placeholder: '',
      options: Promise.resolve(this.ativoOptions)
    }
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl(null),
    documento: new FormControl(null),
    cep: new FormControl(null),
    endereco: new FormControl(null),
    telefone: new FormControl(null),
    ativo: new FormControl(0)
  });

  constructor(
    private readonly _pessoaService: PessoaService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_pessoaService, _injectorLocal);
  }

}

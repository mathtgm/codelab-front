import { Component, Injector } from '@angular/core';
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { IProduto } from '../produto.interface';
import { IFormField, ILabelValue } from '../../../shared/interfaces/form-field.interface';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { intMask } from '../../../shared/masks/masks';
import { FormControl, FormGroup } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { EmptyRowComponent } from '../../../shared/components/empty-row/empty-row.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { ProgressLoadingComponent } from '../../../shared/components/progress-loading/progress-loading.component';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { AddActionComponent } from '../../../shared/components/action-bar/add-action/add-action.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';
import { BoolToTextPipe } from '../../../shared/pipes/bool-to-text.pipe';

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
  selector: 'cl-produto-consulta',
  standalone: true,
  imports,
  templateUrl: './produto-consulta.component.html',
  styleUrl: './produto-consulta.component.scss'
})
export class ProdutoConsultaComponent extends BaseConsultaComponent<IProduto>{

  displayedColumns: string[] = ['id', 'descricao', 'precoCusto', 'precoVenda', 'ativo', 'acoes'];

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
      label: 'Descrição',
      formControlName: 'descricao',
      placeholder: 'Ex.: Leite Desnatado',
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Preço Custo',
      formControlName: 'precoCusto',
      placeholder: 'Ex.: 10.00',
    },
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Preço Venda',
      formControlName: 'precoVenda',
      placeholder: 'Ex.: 20.00',
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
    descricao: new FormControl(null),
    precoCusto: new FormControl(null),
    precoVenda: new FormControl(null),
    ativo: new FormControl(0),
  });

  constructor(
    private readonly _produtoService: ProdutoService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_produtoService, _injectorLocal);
  }
}

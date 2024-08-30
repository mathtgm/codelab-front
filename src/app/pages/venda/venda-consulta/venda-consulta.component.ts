import { Component, Injector } from '@angular/core';
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { IVenda } from '../venda.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddActionComponent } from '../../../shared/components/action-bar/add-action/add-action.component';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { EmptyRowComponent } from '../../../shared/components/empty-row/empty-row.component';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { ProgressLoadingComponent } from '../../../shared/components/progress-loading/progress-loading.component';
import { BoolToTextPipe } from '../../../shared/pipes/bool-to-text.pipe';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';
import { VendaService } from '../venda.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { ILabelValue, IFormField } from '../../../shared/interfaces/form-field.interface';
import { intMask } from '../../../shared/masks/masks';
import { FormatDatetimePipe } from "../../../shared/pipes/format-datetime.pipe";

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
  selector: 'cl-venda-consulta',
  standalone: true,
  imports: [...imports, FormatDatetimePipe],
  templateUrl: './venda-consulta.component.html',
  styleUrl: './venda-consulta.component.scss'
})
export class VendaConsultaComponent extends BaseConsultaComponent<IVenda>{

  displayedColumns: string[] = ['id', 'pessoa', 'valorTotal', 'dataHora', 'pago', 'acoes'];

  pagoOptions: ILabelValue[] = [
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
      label: 'Nome pessoa',
      formControlName: 'pessoa',
      placeholder: 'Ex.: José',
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Valor total (R$)',
      formControlName: 'valorTotal',
      placeholder: 'Ex.: 10.00',
    },
    {
      type: EFieldType.Datepicker,
      class: 'grid-2',
      label: 'Data',
      formControlName: 'dataHora',
      placeholder: '',
    },
    {
      type: EFieldType.Select,
      class: 'grid-1',
      label: 'Pago',
      formControlName: 'pago',
      placeholder: '',
      options: Promise.resolve(this.pagoOptions),
    },
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    idPessoa: new FormControl(null),
    pessoa: new FormControl(null),
    idUsuarioLancamento: new FormControl(null),
    valorTotal: new FormControl(null),
    dataHora: new FormControl(null),
    pago: new FormControl(0),
  });

  constructor(
    private readonly _vendaService: VendaService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_vendaService, _injectorLocal);
  }

}

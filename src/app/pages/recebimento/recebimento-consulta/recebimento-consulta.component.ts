import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
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
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { IRecebimento } from '../recebimento.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { intMask } from '../../../shared/masks/masks';
import { RecebimentoService } from '../recebimento.service';
import { FormatDatetimePipe } from "../../../shared/pipes/format-datetime.pipe";

const actions = [BackActionComponent, AddActionComponent];
const table = [MatTableModule, MatSortModule, MatPaginatorModule];
const pipes = [BoolToTextPipe, FormatIdPipe, FormatDatetimePipe];
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
  selector: 'cl-recebimento-consulta',
  standalone: true,
  imports,
  templateUrl: './recebimento-consulta.component.html',
  styleUrl: './recebimento-consulta.component.scss'
})
export class RecebimentoConsultaComponent extends BaseConsultaComponent<IRecebimento>{

  displayedColumns: string[] = ['id', 'idContaReceber', 'idUsuarioBaixa', 'valorPago', 'dataHora', 'acoes'];

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
      label: 'Cod. venda',
      formControlName: 'idContaReceber',
      placeholder: 'Ex.: 2',
      mask: intMask,
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Cod. usuario baixa',
      formControlName: 'idUsuarioBaixa',
      placeholder: 'Ex.: 3',
      mask: intMask
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Valor Pago (R$)',
      formControlName: 'valorPago',
      placeholder: '10.00',
    },
    {
      type: EFieldType.Datepicker,
      class: 'grid-2',
      label: 'Data/Hora',
      formControlName: 'dataHora',
      placeholder: '',
    },
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    idContaReceber: new FormControl(null),
    idUsuarioBaixa: new FormControl(null),
    valorPago: new FormControl(null),
    dataHora: new FormControl(null),
  });

  constructor(
    private readonly _recebimentoService: RecebimentoService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_recebimentoService, _injectorLocal);
  }
}

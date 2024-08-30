import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../shared/classes/base-resource-service/base-resource.service';
import { EAPIPath } from '../../shared/enums/api-info.enum';
import { IRecebimento } from './recebimento.interface';

@Injectable({
  providedIn: 'root'
})
export class RecebimentoService extends BaseResourceService<IRecebimento> {

  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.recebimento);
  }
}

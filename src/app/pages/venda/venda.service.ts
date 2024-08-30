import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../shared/classes/base-resource-service/base-resource.service';
import { IVenda } from './venda.interface';
import { EAPIPath } from '../../shared/enums/api-info.enum';
import { Observable } from 'rxjs';
import { IResponse } from '../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class VendaService extends BaseResourceService<IVenda>{

  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.venda);
  }
}

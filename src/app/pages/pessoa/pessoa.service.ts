import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../shared/classes/base-resource-service/base-resource.service';
import { IPessoa } from './pessoa.interface';
import { EAPIPath } from '../../shared/enums/api-info.enum';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseResourceService<IPessoa>{

  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.pessoa);
  }
}

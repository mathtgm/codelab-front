import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../shared/classes/base-resource-service/base-resource.service';
import { IProduto } from './produto.interface';
import { EAPIPath } from '../../shared/enums/api-info.enum';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseResourceService<IProduto> {

  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.produto);
  }
}

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { usuarioRoutes } from './usuario/usuario.routing';
import { EMenuPermissao } from '../shared/enums/menu-permissao.enum';
import { produtoRoutes } from './produto/produto.routing';
import { pessoaRoutes } from './pessoa/pessoa.routing';
import { vendaRoutes } from './venda/venda.routing';
import { recebimentoRoutes } from './recebimento/recebimento.routing';

export const pagesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      modulo: EMenuPermissao.Home,
    },
  },
  ...usuarioRoutes,
  ...produtoRoutes,
  ...pessoaRoutes,
  ...vendaRoutes,
  ...recebimentoRoutes
];

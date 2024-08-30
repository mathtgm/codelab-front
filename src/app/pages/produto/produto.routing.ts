import { Routes } from '@angular/router';
import { pendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { ProdutoConsultaComponent } from './produto-consulta/produto-consulta.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';

export const produtoRoutes: Routes = [
  {
    path: 'produto',
    children: [
      {
        path: 'consulta',
        component: ProdutoConsultaComponent,
      },
      {
        path: 'cadastro',
        component: ProdutoCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'editar/:id',
        component: ProdutoCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: '**',
        redirectTo: 'consulta',
        pathMatch: 'full',
      },
    ],
  },
];

import { Routes } from '@angular/router';
import { pendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { VendaCadastroComponent } from './venda-cadastro/venda-cadastro.component';
import { VendaConsultaComponent } from './venda-consulta/venda-consulta.component';

export const vendaRoutes: Routes = [
  {
    path: 'venda',
    children: [
      {
        path: 'consulta',
        component: VendaConsultaComponent,
      },
      {
        path: 'cadastro',
        component: VendaCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'editar/:id',
        component: VendaCadastroComponent,
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

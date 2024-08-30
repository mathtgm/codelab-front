import { Routes } from '@angular/router';
import { pendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { PessoaConsultaComponent } from './pessoa-consulta/pessoa-consulta.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

export const pessoaRoutes: Routes = [
  {
    path: 'pessoa',
    children: [
      {
        path: 'consulta',
        component: PessoaConsultaComponent,
      },
      {
        path: 'cadastro',
        component: PessoaCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'editar/:id',
        component: PessoaCadastroComponent,
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

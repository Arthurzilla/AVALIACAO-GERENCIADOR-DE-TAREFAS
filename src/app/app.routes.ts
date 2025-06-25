import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'criacao-de-tarefa',
    loadComponent: () => import('./criacao-de-tarefa/criacao-de-tarefa.page').then( m => m.CriacaoDeTarefaPage)
  },
];

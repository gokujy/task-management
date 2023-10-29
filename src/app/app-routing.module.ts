import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardComponentModule)
  },
  // {
  //   path: 'add-edit-task',
  //   loadChildren: () => import('./pages/add-edit-task/add-edit-task.module').then(m => m.AddEditTaskComponentModule)
  // },
  {
    path: 'task-detail/:id',
    loadChildren: () => import('./pages/view-task/view-task.module').then(m => m.ViewTaskComponentModule)
  },
  {
    path: 'task-list',
    loadChildren: () => import('./pages/task-list/task-list.module').then(m => m.TaskListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

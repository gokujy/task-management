import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ViewTaskComponent} from "./view-task.component";
import {RouterModule, Routes} from "@angular/router";
import {TaskListComponent} from "../task-list/task-list.component";

const routes: Routes = [
  {
    path: '',
    data: {title: 'Task Details'},
    component: ViewTaskComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ViewTaskComponent],
  exports: [RouterModule]
})
export class ViewTaskComponentModule {
}

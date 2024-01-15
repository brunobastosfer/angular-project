import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoNewComponent } from './todo-new/todo-new.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

const routes: Routes = [
  {path: "new", component: TodoNewComponent},
  {path: "edit/:id", component: TodoEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }

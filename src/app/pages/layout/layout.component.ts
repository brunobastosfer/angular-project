import { Component, OnInit } from '@angular/core';
import { TodosService } from './shared/todos.service';
import { Todo } from './shared/todo.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  public listTodos:Array<Todo> = []

  public client_id:number = 0

  constructor(private todoService:TodosService, private toastr: ToastrService){

  }

  ngOnInit(): void {
    
    this.todoService.listAll().subscribe(
      res => {
        this.listTodos = res
      }
    )
  }

  public removeTodo(client_id: any) {
    this.todoService.removeTodo(client_id).subscribe(
      res => {
        this.toastr.success("Client remove successful")
      },
      err => {
        this.toastr.error("Failed to remove a client")
      }
    )
    const newList = this.listTodos.filter((item) => item.id != client_id)
    this.listTodos = newList
  }

  updateList($event: Todo){
    this.listTodos.push($event)
  }

  sendRoute(client_id: any) {
    this.todoService.client_id = client_id;
    this.client_id = client_id;
  }

  editList($event: Todo){
    this.listTodos.forEach((item) => {
      if(item.id == $event.id) {
        item.title = $event.title
        item.description = $event.description
        item.status = $event.status
      }
    })

  }

  badgeDinamic(status?: string): string {
    if(status == 'pending') {
      return "bg-secondary"
    }
    return "bg-success"
  }


}

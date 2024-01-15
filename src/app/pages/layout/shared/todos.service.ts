import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../enviroments/environment";
import { Todo } from '../shared/todo.model'
import { LayoutComponent } from "../layout.component";

@Injectable({
  providedIn: 'root'
})

export class TodosService {

  constructor(private http: HttpClient) {

  }

  public client_id = 0

  public listAll():Observable<Todo[]>{
    const url = `${environment.baseUrlBackend}/api/todos/`

    return this.http.get(url).pipe(
      map(this.mapToTodos)
    )
  }

  private mapToTodos(data:any):Array<Todo>{
    const listTodos: Todo[] = [];

    data.forEach((e:any) => listTodos.push(Object.assign(new Todo, e)))

    return listTodos;
  }

  private mapToTodo(data:any):Todo {
    const listTodos: Todo[] = [];

    return Object.assign(new Todo, data)
  }

  public saveNew(newTodo: Todo): Observable<Todo> {
    const url = `${environment.baseUrlBackend}/api/todos/`

    return this.http.post(url, newTodo).pipe(
      map(this.mapToTodo)
    )
  }

  public editTodo(todo: Todo): Observable<Todo>{
    const url = `${environment.baseUrlBackend}/api/todos/${this.client_id}/update/`
    return this.http.put(url, todo).pipe(
      map(this.mapToTodo)
    )
  }

  public listById(id: number): Observable<Todo> {
     const url = `${environment.baseUrlBackend}/api/todos/${id}/`
     return this.http.get(url).pipe(
      map(this.mapToTodo)
     )
  }

  public removeTodo(id: number): Observable<any> {
    const url = `${environment.baseUrlBackend}/api/todos/${id}/delete/`
    return this.http.delete(url)
  }

}
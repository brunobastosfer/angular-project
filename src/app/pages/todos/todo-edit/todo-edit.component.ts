import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../layout/shared/todos.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../layout/shared/todo.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.css'
})
export class TodoEditComponent {

  public formTodo: FormGroup;

  @Output() editTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private fb: FormBuilder, private todoService: TodosService, private toastr: ToastrService, private activedRoute: ActivatedRoute) {
    this.formTodo = this.buildFormTodo()
  }

  public buildFormTodo(): FormGroup {
    return this.fb.group({
      title: [null, [Validators.required]],
      description: null,
      status: null,
    })
  }

  public isFormControlInvalid(controlTitle: string): boolean {
    return !!(this.formTodo.get(controlTitle)?.invalid && this.formTodo.get(controlTitle)?.touched)
  }

  public saveTodo():void {
  
    const todo:Todo = this.formTodo.value as Todo;

    this.todoService.editTodo(todo).subscribe(
      res => {
        this.toastr.success("Todo updated.");
        this.formTodo.reset();
        this.editTodo.emit(res);
      }, err => {
        this.toastr.error("Fail to updated a todo.")
        this.formTodo.reset();
      }
    )
  }
}
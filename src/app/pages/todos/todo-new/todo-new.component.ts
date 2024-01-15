import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../layout/shared/todos.service';
import { Todo } from '../../layout/shared/todo.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrl: './todo-new.component.css'
})

export class TodoNewComponent {

  public formTodo: FormGroup;

  @Output() newTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private fb: FormBuilder, private todoService: TodosService, private toastr: ToastrService) {
    this.formTodo = this.buildFormTodo();
  }

  private buildFormTodo():FormGroup {
    return this.fb.group({
      title: [null, [Validators.required]],
      description: null
    })
  }

  public isFormControlInvalid(controlTitle: string):boolean {
    return !!(this.formTodo.get(controlTitle)?.invalid && this.formTodo.get(controlTitle)?.touched)
  }

  public saveNewTodo():void{
    
    const newTodo:Todo = this.formTodo.value as Todo;

    this.todoService.saveNew(newTodo).subscribe(
      res => {
        this.toastr.success("New todo has been added.");
        this.formTodo.reset();
        this.newTodo.emit(res);
      }, err => {
        this.toastr.error("Fail to save a new todo.")
      }
    )
  }

}

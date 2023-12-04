import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { Todo } from './todo';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TableModule,
    CardModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todos-app-client';

  @ViewChild('todoTask') todoTask: any;
  
  task = '';
  todos: Todo[] = [];
  onGoingTask: Todo[] = this.todos.filter((v) => !v.completed);
  doneTask: Todo[] = this.todos.filter((v) => v.completed);

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.appService.getTodoList().subscribe((response) => {
      this.todos = response;
    });
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo) {
    this.appService
      .updateTodo({ ...todo, completed: e.checked })
      .subscribe((response) => console.log(response));
  }

  deleteTodo(e: unknown, id: Todo['id']) {
    this.appService.deleteTodo(id).subscribe((response) => this.getList());
  }

  addTodo() {
    this.appService
      .addTodo({ task: this.task, completed: false })
      .subscribe((response) => {
        this.todoTask.reset();
        this.getList();
      });
  }
}

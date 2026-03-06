import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasks = signal<Task[]>([
    { id: 1, title: 'Comprar leche', completed: false },
    { id: 2, title: 'Lavar el coche', completed: true },
    { id: 3, title: 'Estudiar Angular', completed: false },
  ]);

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      (control) => control.value.trim() === '' ? { required: true } : null
    ]
   });

  changeHandler() {
    if(this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      this.addTask(value);
      this.newTaskControl.setValue('');
    }
  }

  addTask(newTask: string) {
    this.tasks.update((tasks) => [
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
      },
    ]);
  }

  deleteTask(taskId: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  updateTaskStatus(taskId: number, completed: boolean) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  }
}

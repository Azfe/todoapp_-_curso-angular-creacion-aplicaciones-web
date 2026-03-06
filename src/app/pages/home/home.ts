import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasks = signal<Task[]>([
    { id: 1, title: 'Comprar leche', completed: false },
    { id: 2, title: 'Lavar el coche', completed: true },
    { id: 3, title: 'Estudiar Angular', completed: false }
  ])

  changeHandler(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
    input.value = '';
    // this.tasks.update((tasks) => [
    //   ...tasks,
    //   {
    //     id: tasks.length + 1,
    //     title: newTask,
    //     completed: false
    //   }
    // ]);
    // input.value = '';
  }

  addTask(newTask: string) {
    this.tasks.update((tasks) => [
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        completed: false
      }
    ]);
  }

  deleteTask(taskId: number) {
    this.tasks.update((tasks) => tasks.filter(task => task.id !== taskId));
  }
}

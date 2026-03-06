import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasks = signal ([
    { id: 1, title: 'Comprar leche', completed: false },
    { id: 2, title: 'Lavar el coche', completed: true },
    { id: 3, title: 'Estudiar Angular', completed: false }
  ])

  changeHandler(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks) => [
      ...tasks,
      {
        id: tasks.length + 1,
        title: newTask,
        completed: false
      }
    ]);
    input.value = '';
  }

  deleteTask(taskId: number) {
    this.tasks.update((tasks) => tasks.filter(task => task.id !== taskId));
  }
}

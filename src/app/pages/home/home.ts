import { Component, signal, computed, effect } from '@angular/core';
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

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filterValue = this.filter();
    const tasks = this.tasks();
    if (filterValue === 'pending') {
      return tasks.filter(task => !task.completed);
    } else if (filterValue === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  })

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/\S/),
      (control) => control.value.trim() === '' ? { required: true } : null
    ]
   });

   constructor() {
      effect(() => {
        const tasks = this.tasks();
        console.log('Tasks updated:', tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });
   }

   ngOnInit() {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      this.tasks.set(JSON.parse(tasksFromStorage));
    }
   }

  changeHandler() {
    if(this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if(value !== '') {
        this.addTask(value);
        this.newTaskControl.setValue('');
      }
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

  updateTaskEditingMode(taskId: number, editing: boolean) {
    this.tasks.update(prevState => {
      return prevState.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            editing: true
          };
        }
        return {
          ...task,
          editing: false
        };
      });
    });
  }

  updateTaskText(taskId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title: input.value,
            editing: false
          };
        }
        return task;
      });
    });
  }

  changeFilter(newFilter: 'all' | 'pending' | 'completed') {
    this.filter.set(newFilter);
  }
}

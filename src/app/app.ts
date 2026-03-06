import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todoapp');
  welcomeMessage = 'Bienvenido a tu aplicación de tareas';
  taskList = [
    { id: 1, title: 'Comprar leche', completed: false },
    { id: 2, title: 'Lavar el coche', completed: true },
    { id: 3, title: 'Estudiar Angular', completed: false }
  ];
}

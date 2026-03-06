import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.html',
  styleUrl: './labs.css',
})
export class Labs {
  welcomeMessage = 'Bienvenido a tu aplicación de tareas';
  taskList = [
    { id: 1, title: 'Comprar leche', completed: false },
    { id: 2, title: 'Lavar el coche', completed: true },
    { id: 3, title: 'Estudiar Angular', completed: false }
  ];
  name: string = 'Alex';
  age: number = 41;
  disabled : boolean = true;
  imgUrl: string = 'https://picsum.photos/400/300';
  person = {
    name: 'Alex',
    age: 41,
    avatar: 'https://thispersondoesnotexist.com/'
  }
  onButtonClick() {
    alert('¡Hola! Has hecho clic en el botón.');
  }

  changeHandler(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
    console.log(this.name);
  }
  nameSignal = signal('Alex');

  changeNameSignalHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nameSignal.set(input.value);
  }
}

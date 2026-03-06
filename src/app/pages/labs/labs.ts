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
  person = signal( {
    name: 'Alex',
    age: 41,
    avatar: 'https://thispersondoesnotexist.com/'
  });

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

  recordCollection = signal ([
    {
      id: 1,
      title: 'Album 1',
      artist: 'Artist 1',
      year: 2000,
      cover: 'https://picsum.photos/200/200?random=1'
    },
    {
      id: 2,
      title: 'Album 2',
      artist: 'Artist 2',
      year: 2005,
      cover: 'https://picsum.photos/200/200?random=2'
    },
    {
      id: 3,
      title: 'Album 3',
      artist: 'Artist 3',
      year: 2010,
      cover: 'https://picsum.photos/200/200?random=3'
    }
  ]);

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => ({
      ...prevState,
      age: Number(newValue)
    }));
  }
}

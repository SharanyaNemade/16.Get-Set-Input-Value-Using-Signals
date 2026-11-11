import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterAppSignals } from './counter-app-signals/counter-app-signals';


@Component({
  imports: [RouterOutlet,CounterAppSignals],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}

import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetSetUsingSignals } from './get-set-using-signals/get-set-using-signals';


@Component({
  imports: [RouterOutlet,GetSetUsingSignals ],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  name:WritableSignal<string> = signal('')
}

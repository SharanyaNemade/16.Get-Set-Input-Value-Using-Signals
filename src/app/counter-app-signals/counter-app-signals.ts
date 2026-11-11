import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-counter-app-signals',
  styleUrl: './counter-app-signals.css',
  templateUrl: './counter-app-signals.html',
})
export class CounterAppSignals {
  counter:WritableSignal<number> = signal<number>(0);

  increment(){
    this.counter.update((val) => val + 1)
  }

  decrement(){
    if(this.counter() > 0)
    {
      this.counter.update((val) => val - 1)
    }
  }

  reset(){
    this.counter.set(0);
  }
}

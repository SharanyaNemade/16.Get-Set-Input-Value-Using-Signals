import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-get-set-using-signals',
  styleUrl: './get-set-using-signals.css',
  templateUrl: './get-set-using-signals.html',
})
export class GetSetUsingSignals {

  name:WritableSignal<string> = signal('')


  resetValue(){
    this.name.set("Anil Sidhu")
  } 


  setValue(val:string){
    this.name.set(val);
  }


}

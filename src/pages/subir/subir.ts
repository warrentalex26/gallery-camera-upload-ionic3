import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  constructor(public viewController: ViewController) {
  }

  cerrar_Modal(){ // para cerrar el modal necesitamos el viewController
    this.viewController.dismiss(); // cerramos el modal
  }

}

import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  post: Observable<any[]>;

  constructor(private modalController: ModalController,
              private afDB: AngularFireDatabase) {

    // @ts-ignore
    this.post = afDB.list('post').valueChanges(); // valueChanges es el observador donde nos podemos suscribir para ver los cambios en tiempo real

  }

  mostrar_Modal(){ // Para mostrar el modal necesitamos el modalController y la pagina que queremos mostrar como modal
    let modal = this.modalController.create(SubirPage);
    modal.present() // Mostramos el modal
  }

}

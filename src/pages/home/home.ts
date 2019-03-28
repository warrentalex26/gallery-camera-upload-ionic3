import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private modalController: ModalController) {

  }

  mostrar_Modal(){ // Para mostrar el modal necesitamos el modalController y la pagina que queremos mostrar como modal
    let modal = this.modalController.create(SubirPage);
    modal.present() // Mostramos el modal
  }

}

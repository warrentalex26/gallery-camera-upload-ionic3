import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo'

// import { AngularFireDatabase } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  aunHayMas:boolean = true; // Bandera para controlar el infinite scroll
  // post: Observable<any[]>;

  constructor(private modalController: ModalController,
              private cargaArchivoProvider: CargaArchivoProvider) {

    // @ts-ignore
    // this.post = afDB.list('post').valueChanges(); // valueChanges es el observador donde nos podemos suscribir para ver los cambios en tiempo real

  }

  mostrar_Modal(){ // Para mostrar el modal necesitamos el modalController y la pagina que queremos mostrar como modal
    let modal = this.modalController.create(SubirPage);
    modal.present() // Mostramos el modal
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
      //Nos suscribimos a la promesa para ocupar el infinite scroll
      this.cargaArchivoProvider.cargarImagenes().then((hayMas:boolean) => {
        console.log(hayMas);
        this.aunHayMas = hayMas; // con esto le decimos que aunhaymas que es falso porque llego al final y lo controlamos desde el HTML con la propiedad [enabled]
        infiniteScroll.complete()
      });


  }

}

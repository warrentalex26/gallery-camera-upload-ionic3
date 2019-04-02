import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];

  constructor(public toastCtrl: ToastController,
              public afDB: AngularFireDatabase) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargarImagenFirebase(archivo: ArchivoSubir){ // Pasamos el "archivo" que es la imagen a subir de tipo ArchivoSubir para que tengamos las propiedades y sea mas especifico
    let promesa = new Promise((resolve, reject ) => { // tarea asincrona para decirle al usuario que se espera porque se esta subiendo la imagen
      this.mostrarToast('Cargando'); // Mostramos en toast el mensaje de cargando al subir imagen

      let storeRef = firebase.storage().ref(); //Ocupamos hacer referencia al storage de nuestro firebase
      let nombreArchivo: string = new Date().valueOf().toString(); // Nombre para el archivo, OPCIONAL lo hago con valueOf para que me arroje un numero aleatorio para el nombre

      let uploadTask:firebase.storage.UploadTask = //Tarea de firebase que notifica si el archivo se sube o no a firebase de tipo UploadTask
          storeRef.child(`img/${nombreArchivo}`) //Ocupamos una referencia a una carpeta de las imagenes, es decir creara una carpeta en el storage
            .putString(archivo.img, 'base64', {contentType: 'image/jpeg'}); // Subimos el archivo

      // 'on' es un observable que nos dira si el archivo se esta subiendo, se termino de subir o dio error,
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  () => {}, // Saber el % de cuantos MBS se han subido
          (error) => { // Manejo del error
                    console.log(`Error en la carga`);
                    console.log(JSON.stringify(error));
                    this.mostrarToast(JSON.stringify(error));
                      reject();
                            },
        () => { // CUANDO SALE BIEN!!!
                    console.log('ARCHIVO SUBIDO');
                    this.mostrarToast('Imagen cargada correctamente');
                    uploadTask.snapshot.ref.getDownloadURL().then(urlImage => { // guardamos en la BD
                      this.crearPost(archivo.titulo, urlImage, nombreArchivo);
                      this.mostrarToast('URL: ' + urlImage)
                    }).catch(error => {
                      console.log(error);
                    });

                    resolve();
        }
        )
    });
    return promesa;
  }

  private crearPost(titulo: string, url: string, nombreArchivo:string){ //BD
    let post : ArchivoSubir = {
        img: url,
        titulo: titulo,
        key: nombreArchivo
    };
    
    console.log(JSON.stringify(post));

    // this.afDB.list('/post').push(post)
    this.afDB.object(`/post/${nombreArchivo}`).update(post); // Guardarlo en la BD
    this.imagenes.push(post); //Actualizamos la BD

  }

  mostrarToast(mensaje: string){ // Recibimos el mensaje que vamos a mostrar
      const toast = this.toastCtrl.create({
        message: mensaje,
        duration: 2000
      });
      toast.present();
  }

}

interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}

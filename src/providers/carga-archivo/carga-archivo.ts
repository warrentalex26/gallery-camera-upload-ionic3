import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = []; // El arreglo de imagenes para no leerlo directamente de firebase
  lastKey: string = null; // Con esta propiedad controlamos el ultimo elemento que se inserto en firebase

  constructor(public toastCtrl: ToastController,
              public afDB: AngularFireDatabase) {
    // Nos suscribimos al observable sino no funcionara
    this.cargarUltimoKey().subscribe( () => {
      //Cuando ya tenga el ultimo kay podra ejecutar 'x' cosa aca adentro
      this.cargarImagenes();
    });

  }

  cargarImagenes(){
    let promesa = new Promise((resolve, reject) => {
      this.afDB.list('/post', ref => ref.limitToLast(4).orderByKey().endAt(this.lastKey)) //Obtenemos el nodo de los 'post' con los ultimos 3 elementos, ordenarlos por su llave y que termine en la ultima llave
        .valueChanges() // Estamos pendientes si hay cambios, esto regresa un observable y nos tenemos que suscribir
        .subscribe((posts: any) => { // Aca obtenemos todos los registros
          posts.pop(); // Eliminamos la ultima posicion del arreglo porque nos trae un duplicado de la ultima imagen
          if (posts.length == 0){ // Quiere decir que ya no hay mas registros
            console.log("Ya no hay mas registros " + posts);
            resolve(false); // Ya no hay mas registros
            return;
          }
          //Sino entra al if quiere decir que hay registros
          this.lastKey = posts[0].key; // Obtenemos el ultimo elemento
          for (let i = posts.length - 1; i >= 0; i--){ // Insertamos todas las imagenes
            let post = posts[i];
            this.imagenes.push(post);
          }
          resolve(true);
        });
    });
    return promesa
  }

  private cargarUltimoKey(){ // Es privada porque solo se llama una unica vez cuando el servicio es inicializado
    return this.afDB.list('/post', ref => ref.orderByKey().limitToLast(1)) //Obtenemos el nodo de los 'post' con el ultimo elemento.
      .valueChanges() // Estamos pendientes si hay cambios
      .map((post:any) => { // Vamos a recibir el ultimo elemento
        console.log(post);
        this.lastKey = post[0].key; // Arreglo con el ultimo id es decir el nodo que esta en los post
        this.imagenes.push(post[0]); // Lo insertamos en el arreglo de imagenes
      });

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
                    this.mostrarToast('Imagen cargada correctamente'); // ACA SABEMOS QUE LA IMAGEN DE CARGO
                    uploadTask.snapshot.ref.getDownloadURL().then(urlImage => { // ACA obtenemos el URL
                      this.crearPost(archivo.titulo, urlImage, nombreArchivo); // Creamos el post mandando los parametros necesarios
                      this.mostrarToast('URL: ' + urlImage) // Llamamos el toast
                    }).catch(error => {
                      console.log(error); // Si sucede un error
                    });

                    resolve();
        }
        )
    });
    return promesa;
  }

  private crearPost(titulo: string, url: string, nombreArchivo:string){ //BD
    let post : ArchivoSubir = { // Esto será lo que insertaremos a firebase
        img: url, // la url de la imagen que le vamos a pasar
        titulo: titulo, // el titulo de la imagen
        key: nombreArchivo //La llave sera el nombre del archivo
    };
    
    console.log(JSON.stringify(post));

    // this.afDB.list('/post').push(post) // SE PUEDE HACER ASI PERO NODO DEL JSON NO ES PERSONALIZABLE
    this.afDB.object(`/post/${nombreArchivo}`).update(post); // creamos en la BD como el nodo "post" y luego cada elemento sera el nombre del archivo que contendra la imagen
    this.imagenes.push(post); //Actualizamos el arreglo de imagenes

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

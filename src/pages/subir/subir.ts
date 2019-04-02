import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string = ""; // Con las comillas controlamos el crear post con [Disabled]
  imagePreview: string = ""; // Con las comillas controlamos el crear post con [Disabled]
  imagen64: string;

  constructor(public viewController: ViewController,
              private camera: Camera,
              private imagePicker: ImagePicker,
              public cargaArchivoProvider: CargaArchivoProvider) {
  }

  cerrar_Modal(){ // para cerrar el modal necesitamos el viewController
    this.viewController.dismiss(); // cerramos el modal
  }

  mostrarCamara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagePreview = 'data:image/jpeg;base64,' + imageData; // Firebase lo que necesita es que las imagenes esten en formato base64
      this.imagen64 = imageData;
    }, (err) => {
      console.log(`error en camara ${err}`);
    });
  }

  seleccionarFoto(){

    let opciones: ImagePickerOptions = {
      quality: 70,
      outputType: 1, // La imagen en base 64
      maximumImagesCount: 1
    };

    this.imagePicker.getPictures(opciones).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.imagePreview = 'data:image/jpeg;base64,' + results[i];
        this.imagen64 = results[i];
      }
    }, (err) => {
      console.log(`error en selector ${JSON.stringify(err)}`);
    });
  }

  crearPost(){
    let archivo = {
      img: this.imagen64, //Es la imagen en base 64
      titulo: this.titulo
    };
    this.cargaArchivoProvider.cargarImagenFirebase(archivo).then(() =>{
      this.cerrar_Modal(); // Cerrar modal una vez se suba el archivo a firebase(Storage y BD)
    })

  }

}

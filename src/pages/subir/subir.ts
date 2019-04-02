import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;
  imagePreview: string;

  constructor(public viewController: ViewController,
              private camera: Camera,
              private imagePicker: ImagePicker) {
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
      }
    }, (err) => {
      console.log(`error en selector ${JSON.stringify(err)}`);
    });
  }

}

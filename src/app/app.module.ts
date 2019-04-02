import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Pipes
import {PipesModule} from "../pipes/pipes.module";

//Plugins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';

//Pagina
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from  '../pages/subir/subir';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';


export const firebaseConfig = {
  apiKey: "AIzaSyDCz0xEwFsZIi0gKEV2kKVrqAxR9qzGUkU",
  authDomain: "gag-dev-26844.firebaseapp.com",
  databaseURL: "https://gag-dev-26844.firebaseio.com",
  projectId: "gag-dev-26844",
  storageBucket: "gag-dev-26844.appspot.com",
  messagingSenderId: "124589732706"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider
  ]
})
export class AppModule {}

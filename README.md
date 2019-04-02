# Aplicación de Imagenes

Aplicación realizada en Ionic 3, recuerden instalar los paquetes de node `npm install`

# NOTAS

App de subida de imagenes con las caracteristicas:

* Subir imagen desde la galeria del dispositivo
* subir imagen desde una foto tomada con el dispositivo
* Autenticación con facebook
* La subida de las imagenes seran guardadas en el storage y base de datos de firebase
* Compartir foto a facebook
* Usamos el componente InfiniteScroll de la API en la documentación de ionic

Como Backend ocupamos `firebase` la conexion la logramos con [AngularFire2](https://github.com/angular/angularfire2/blob/master/docs/ionic/v3.md) implementado con ionic 3

Creamos un pipe para que el `ion-tittle` del navbar cambie dinamicamente con respecto al titulo de la imagen que estemos ingresando 

`Si les manda error(No deberia) verificar en el package.json la version del rxjs
dede ser la "rxjs": "6.0.0"`

# Para probarlos en el dispositivo

`ionic platform add ios`

`ionic platform add Android`

Luego:

`ionic build ios`

`ionic build android`

Luego abran xcode o android studio con el proyecto adentro de la carpeta platform y lo prueban en su dispositivo
esto con el fin de que puedan ver los mensajes de depuración en consola.

/* NOTA *********************
CON ESTE PIPE RECIBIREMOS UN PARAMETRO QUE NOS DIGA QUE TEXTO ES EL QUE VAMOS A MOSTRAR
Y QUE TEXTO MOSTRAREMOS SINO ESCRIBE NADA LA PERSONA.
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {

  transform(value: string, defecto: string = "Sin texto") {
    //recibimos la etiqueta que queremos reemplazar en el HTML
    if (value){
      return value; // Mostramos el valor si hay
    }else {
      return defecto; // Sino hay valor mostramos el valor por 'defecto'
    }
  }
}

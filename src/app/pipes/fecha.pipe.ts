import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
  standalone: true
})
export class FechaPipe implements PipeTransform {

  /**
   * Recibe una fecha en formato ISO o un Date y la transforma
   * a dd/mm/yyyy usando configuración local.
   *
   * Se utiliza únicamente para mostrar las fechas formateadas
   * en la interfaz, manteniendo la fecha real en formato ISO
   * para la persistencia.
   */
  transform(value: string | Date): string {

    // Asegura que el valor se convierta correctamente a objeto Date
    const fecha = typeof value === 'string' ? new Date(value) : value;

    // Formatea según las convenciones es-CL
    return fecha.toLocaleString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}

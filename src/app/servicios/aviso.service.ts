import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Aviso } from '../modelo/aviso';

const STORAGE_KEY = 'avisos';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  // Arreglo en memoria que representa los avisos cargados desde el almacenamiento
  private avisos: Aviso[] = [];

  constructor() {}

  /**
   * Recupera los avisos almacenados en Preferences y los carga en memoria.
   * Si no existen avisos previos, inicializa la lista como un arreglo vacío.
   */
  async cargarAvisos(): Promise<void> {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    this.avisos = value ? JSON.parse(value) : [];
  }

  /**
   * Devuelve una copia de la lista de avisos para evitar que el componente
   * modifique accidentalmente el arreglo interno del servicio.
   */
  obtenerAvisos(): Aviso[] {
    return [...this.avisos];
  }

  /**
   * Persistencia centralizada: guarda el arreglo completo de avisos
   * dentro de Preferences en formato JSON.
   */
  private async guardarAvisos(): Promise<void> {
    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(this.avisos)
    });
  }

  /**
   * Agrega un aviso nuevo al inicio del arreglo.
   * Se genera un ID único usando la marca de tiempo actual.
   * Luego se persiste el estado actualizado.
   */
  async agregarAviso(avisoSinId: Omit<Aviso, 'id'>): Promise<void> {
    const nuevoAviso: Aviso = {
      ...avisoSinId,
      id: Date.now()
    };

    this.avisos.unshift(nuevoAviso);
    await this.guardarAvisos();
  }

  /**
   * Elimina un aviso filtrando su ID del arreglo.
   * Persiste el estado actualizado una vez aplicado el cambio.
   */
  async eliminarAviso(id: number): Promise<void> {
    this.avisos = this.avisos.filter(a => a.id !== id);
    await this.guardarAvisos();
  }
}

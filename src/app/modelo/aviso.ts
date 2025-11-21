// Modelo que representa un aviso dentro de la aplicación.
// Se utiliza tanto para la visualización como para la persistencia.
export interface Aviso {

  // Identificador único del aviso (generado automáticamente)
  id: number;

  // Título breve del aviso
  titulo: string;

  // Descripción detallada del contenido del aviso
  descripcion: string;

  // Fecha en formato ISO, asignada automáticamente al crear el aviso
  fecha: string;

  // Imagen opcional asociada al aviso (base64)
  imagen?: string;
}

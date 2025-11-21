import { Routes } from '@angular/router';

export const routes: Routes = [

  // Ruta principal de la aplicación.
  // Se reemplazó la ruta por defecto 'home'
  // para usar 'lista-avisos', ya que representa de manera más clara
  // la pantalla inicial del proyecto y mejora la organización general.
  {
    path: 'lista-avisos',
    loadComponent: () => import('./paginas/lista-avisos/lista-avisos.page').then((m) => m.ListaAvisosPage),
  },

  // Redirección automática a la ruta principal.
  // Permite que la app cargue correctamente incluso si el usuario accede a "/".
  {
    path: '',
    redirectTo: 'lista-avisos',
    pathMatch: 'full',
  },

  // Ruta para la pantalla donde se crea un nuevo aviso.
  {
    path: 'nuevo-aviso',
    loadComponent: () => import('./paginas/nuevo-aviso/nuevo-aviso.page').then( m => m.NuevoAvisoPage)
  },
];

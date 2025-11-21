import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton,
         IonIcon, IonModal, IonButton } from '@ionic/angular/standalone';
         
import { Router } from '@angular/router';
import { AvisoService } from '../../servicios/aviso.service';
import { Aviso } from '../../modelo/aviso';
import { AvisoListaComponent } from '../../componentes/aviso-lista/aviso-lista.component';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-lista-avisos',
  standalone: true,
  templateUrl: './lista-avisos.page.html',
  styleUrls: ['./lista-avisos.page.scss'],
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, 
             IonIcon, IonModal, IonButton, AvisoListaComponent ]
})

export class ListaAvisosPage implements OnInit {

  // Lista completa de avisos almacenados
  avisos: Aviso[] = [];

  // Aviso seleccionado para mostrar el modal de confirmación
  avisoSeleccionado?: Aviso;

  constructor(
    private avisoService: AvisoService,
    private router: Router
  ) {
    // Iconos utilizados por los botones flotantes y el modal
    addIcons({ addOutline, trashOutline, addCircleOutline });
  }

  // Carga inicial al crear la página
  async ngOnInit() {
    await this.cargarAvisos();
  }

  // Se ejecuta cada vez que la vista vuelve a mostrarse
  // Permite refrescar la lista después de crear un aviso nuevo
  async ionViewWillEnter() {
    await this.cargarAvisos();
  }

  // Obtiene los avisos desde el servicio y actualiza la vista
  private async cargarAvisos() {
    await this.avisoService.cargarAvisos();
    this.avisos = this.avisoService.obtenerAvisos();
  }

  // Navega a la página para crear un nuevo aviso
  irACrearAviso() {
    this.router.navigateByUrl('/nuevo-aviso');
  }

  // Prepara el aviso que el usuario quiere eliminar
  // abriendo el modal de confirmación
  pedirConfirmacionEliminar(aviso: Aviso) {
    this.avisoSeleccionado = aviso;
  }

  // Cierra el modal y limpia la selección
  cerrarModal() {
    this.avisoSeleccionado = undefined;
  }

  // Confirma la eliminación y actualiza la lista
  async confirmarEliminar() {
    if (!this.avisoSeleccionado) return;
    
    await this.avisoService.eliminarAviso(this.avisoSeleccionado.id);
    this.avisos = this.avisoService.obtenerAvisos();
    this.cerrarModal();
  }
}

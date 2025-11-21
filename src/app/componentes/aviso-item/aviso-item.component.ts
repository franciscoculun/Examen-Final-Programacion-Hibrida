import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { Aviso } from '../../modelo/aviso';
import { FechaPipe } from '../../pipes/fecha.pipe';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-aviso-item',
  standalone: true,
  templateUrl: './aviso-item.component.html',
  styleUrls: ['./aviso-item.component.scss'],
  imports: [CommonModule, IonItem, IonLabel, IonButton, IonIcon, IonImg, FechaPipe ]
})

export class AvisoItemComponent {

  // Aviso recibido desde el componente padre (lista)
  @Input() aviso!: Aviso;

  // Evento que el padre escucha para confirmar/eliminar el aviso
  @Output() eliminar = new EventEmitter<void>();

  constructor() {
    // Registra el icono que se usa en el botón de eliminar
    addIcons({ trashOutline });
  }

  // Notifica al componente padre que se solicitó eliminar este aviso
  onEliminar() {
    this.eliminar.emit();
  }
}

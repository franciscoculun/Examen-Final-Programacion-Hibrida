import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList } from '@ionic/angular/standalone';
import { Aviso } from '../../modelo/aviso';
import { AvisoItemComponent } from '../aviso-item/aviso-item.component';

@Component({
  selector: 'app-aviso-lista',
  standalone: true,
  templateUrl: './aviso-lista.component.html',
  styleUrls: ['./aviso-lista.component.scss'],
  imports: [
    CommonModule,
    IonList,
    AvisoItemComponent
  ]
})
export class AvisoListaComponent {

  // Lista de avisos entregada por el componente padre (página principal)
  @Input() avisos: Aviso[] = [];

  // Evento que permite comunicar al componente padre
  // que se solicitó eliminar un aviso específico
  @Output() eliminarAviso = new EventEmitter<Aviso>();
}

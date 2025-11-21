import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonItem,
         IonLabel, IonInput, IonTextarea, IonButton, IonImg, IonIcon } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvisoService } from '../../servicios/aviso.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-nuevo-aviso',
  standalone: true,
  templateUrl: './nuevo-aviso.page.html',
  styleUrls: ['./nuevo-aviso.page.scss'],
  imports: [ CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonImg, 
    IonIcon ]
})

export class NuevoAvisoPage {

  // Formulario reactivo que administra los datos del aviso
  formulario: FormGroup;

  // Vista previa de la imagen capturada o seleccionada
  imagenPreview?: string;

  constructor(
    private fb: FormBuilder,
    private avisoService: AvisoService,
    private router: Router
  ) {

    // Se definen los campos y las reglas de validación del formulario
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
    });

    // Se registra el ícono usado en el botón de fotografía
    addIcons({ cameraOutline });
  }

  // Accesos rápidos a los controles del formulario
  get titulo() { return this.formulario.get('titulo'); }
  get descripcion() { return this.formulario.get('descripcion'); }

  /**
   * Captura una fotografía utilizando el plugin de cámara.
   * La imagen se transforma a base64 para guardarla con Preferences.
   */
  async tomarFoto() {
    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    // Se genera la URL base64 solo si la cámara devuelve contenido válido
    if (foto.base64String) {
      this.imagenPreview = `data:image/jpeg;base64,${foto.base64String}`;
    }
  }

  /**
   * Guarda el aviso si el formulario es válido.
   * Agrega la fecha actual y envía los datos al servicio encargado
   * de persistir la información.
   */
  async guardar() {

    // Muestra validaciones en caso de campos incompletos
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    // Fecha en formato ISO para mantener consistencia con el pipe
    const fechaActual = new Date().toISOString();

    // Se envían los datos al servicio que maneja la persistencia
    await this.avisoService.agregarAviso({
      titulo: this.titulo?.value,
      descripcion: this.descripcion?.value,
      fecha: fechaActual,
      imagen: this.imagenPreview
    });

    // Regresa a la página de lista una vez guardado el aviso
    this.router.navigateByUrl('/');
  }
}
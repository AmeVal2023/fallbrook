//subscribe-popup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { ThanksMessageComponent } from '../thanks-message/thanks-message.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-subscribe-popup',
  templateUrl: './subscribe-popup.component.html',
  styleUrls: ['./subscribe-popup.component.scss'],
})

export class SubscribePopupComponent {
  subscribeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private firestore: AngularFirestore,
  ) {
    // Inicializa el formulario con valores predeterminados
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      selectedLanguage: ['english', Validators.required],
    });
  }

  get emailControl() {
    return this.subscribeForm.get('email');
  }

  get languageControl() {
    return this.subscribeForm.get('selectedLanguage');
  }

  async subscribe() {
    // Verifica los errores cuando se hace clic en el botón "Subscribe"
    if (this.subscribeForm.invalid) {
      // Muestra mensajes de error según sea necesario
      if (this.emailControl) {
        if (this.emailControl.hasError('required')) {
          // Email es requerido
          console.error('Email is required.');
        }
        if (this.emailControl.hasError('email')) {
          // Formato de email no válido
          console.error('Invalid email format.');
        }
      }

      if (this.languageControl && this.languageControl.hasError('required')) {
        // Language es requerido
        console.error('Language is required.');
      }

      return;
    }

    // Verifica si el correo electrónico ya está presente en la base de datos
    const email = this.subscribeForm.value.email;
    const emailExists = await this.checkIfEmailExists(email);
    if (emailExists) {
      // Muestra un mensaje de error si el correo electrónico ya está suscrito
      console.error('Este correo electrónico ya está suscrito.');
      return;
    }

    // Cierra este popup de suscripción inmediatamente
    this.popoverController.dismiss();

    // Lógica de suscripción

    // Guarda los datos en Firebase Firestore
    try {
      const { selectedLanguage } = this.subscribeForm.value;

      // Aquí usamos await para esperar a que se complete la operación de Firestore
      await this.firestore.collection('subscribe').add({
        email,
        language: selectedLanguage,
      });

      // Muestra el mensaje de agradecimiento después de 2 segundos
      setTimeout(async () => {
        const popover = await this.popoverController.create({
          component: ThanksMessageComponent,
          translucent: true,
        });

        await popover.present();

        // Cierra el popup después de 2 segundos (ajusta según tus necesidades)
        setTimeout(() => {
          popover.dismiss();
        }, 2000);
      }, 0);
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
    }
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    // Verifica si el correo electrónico ya está presente en la base de datos
    const snapshot = await this.firestore.collection('subscribe').ref.where('email', '==', email).get();
    return !snapshot.empty;
  }
}

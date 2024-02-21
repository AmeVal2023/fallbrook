// login.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService, // Inyecta el servicio de autenticación
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  //visibilidad password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    if (this.loginForm.valid) { // Verifica si el formulario es válido
      const { email, password } = this.loginForm.value;

      const loader = await this.loadingController.create({
        message: 'Wait a moment please...',
      });
      await loader.present();

      try {
        await this.authService.login(email, password); // Llama al método de login del servicio de autenticación
        this.navCtrl.navigateRoot('/tabs/home');
      } catch (error) {
        console.error('Error during login:', error);
        this.showToast('Sorry, something went wrong... please try again later');
      } finally {
        await loader.dismiss();
      }
    } else {
      this.showToast('Please fill out the form correctly');
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
    }).then(toastData => toastData.present());
  }
}

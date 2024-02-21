// register.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  userForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.validatePasswordMatch.bind(this),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });    
  }

  //visibilidad password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validatePasswordMatch(): { [key: string]: boolean } | null {
    const passwordControl = this.userForm?.get('password');
    const confirmPasswordControl = this.userForm?.get('confirmPassword');
    
    if (!passwordControl || !confirmPasswordControl || passwordControl.errors || confirmPasswordControl.errors) {
      // Uno o ambos controles son nulos o tienen errores, manejar el caso según sea necesario
      return null; // O podrías devolver un error específico
    }
    
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
    
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async register() {
    if (this.formValidation()) {
      const loader = await this.loadingController.create({
        message: 'Wait a moment please...',
      });
  
      await loader.present();
  
      try {
        await this.afAuth.createUserWithEmailAndPassword(
          this.userForm.value.email,
          this.userForm.value.password
        );
        this.navCtrl.navigateRoot('home');
      } catch (error: any) {
        let errorMessage = 'Sorry, something went wrong... please try again later';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use';
        }
        this.showToast(errorMessage);
      }
  
      await loader.dismiss();
    }
  }
  
  

  formValidation(): boolean {
    if (this.userForm.invalid) {
      this.showToast('Please fill out the form correctly');
      return false;
    }

    if (this.userForm.value.password !== this.userForm.value.confirmPassword) {
      this.showToast('Passwords do not match');
      return false;
    }

    return true; // Todas las validaciones son exitosas
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
    }).then(toastData => toastData.present());
  }
}

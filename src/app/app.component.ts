//app.component.ts
import { Component } from '@angular/core';
import { LoadingController, NavController, PopoverController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isAuthenticated: boolean = false;
  public appPages = [
    { title: 'Login', url: '/login', icon: 'person' },
    { title: 'Register', url: '/register', icon: 'laptop' },
    { title: 'Home', url: '/tabs/home', icon: 'home' },
    { title: 'Messages', url: '/tabs/message', icon: 'chatbox' },
    { title: 'Clinic History', url: '/tabs/historial', icon: 'time' },
    { title: 'Blog', url: '/tabs/blog', icon: 'book' },
  ];
  //Constructor Popup
  constructor(
    private authService: AuthService,  
    private navCtrl: NavController, 
    private loadingController: LoadingController,
    private emailComposer: EmailComposer) {}
    
  //ngOnInit
  ngOnInit() {
    this.authService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  // Este método se llama cuando el usuario inicia sesión
  onLogin() {
    this.isAuthenticated = true;
  }

  // Este método se llama cuando el usuario cierra sesión
  onLogout() {
    this.isAuthenticated = false;
  }

  //abrir redes sociales con la aplicacion correspondiente
  openSocialMedia(url: string): void {
    window.open(url, '_system');
  }
  
  // Función para enviar el correo electrónico
  contact(){
    this.sendEmail();
  }
  private sendEmail() {
    try {
      const emailOptions = {
        to: 'support@fallbrookmedicalcenter.com',  // Correo de destino
        cc: '',  // Copia carbono (opcional)
        bcc: '',  // Copia carbono oculta (opcional)
        attachments: [],  // Archivos adjuntos (opcional)
        subject: 'Contact me - App Fallbrook',
        body: '',
        isHtml: false,  // Establece en true si el cuerpo del correo electrónico es HTML
      };

      this.emailComposer.open(emailOptions);
      }catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }
  //Sesiones y Cierre
  get userEmail(): string {
    // Obtiene el correo del usuario autenticado desde el servicio AuthService
    const user = this.authService.getUser();
    return user ? user.email : '';
  }

  // Cierra sesión utilizando el servicio AuthService
  async logout() {
    let loader = await this.loadingController.create({
      message: "Wait a moment please..."
    });
    try {
      await loader.present();
      await this.authService.logout();
      // Llama al método onLogout() del componente AppComponent después de cerrar sesión
      this.onLogout();
      this.navCtrl.navigateRoot('/tabs/home');
    } catch (error) {
      console.error('Error during logout:', error);
      // Manejar el error según tus necesidades, como mostrar un mensaje al usuario
    } finally {
      await loader.dismiss(); // Asegurarse de que el loader se cierre incluso si hay un error
    }
  }
}

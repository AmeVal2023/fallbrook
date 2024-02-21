// home.page.ts
import { Component } from '@angular/core';
import { SubscribePopupComponent } from 'src/app/components/subscribe-popup/subscribe-popup.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private popoverController: PopoverController,
    private router: Router
  ) {}

  async openSubscribePopup(ev: any) {
    const popover = await this.popoverController.create({
      component: SubscribePopupComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
  
  // Abrir URL sin salir
  openMyECW() {
    const externalUrl = 'https://mycw104.ecwcloud.com/portal14208/jsp/100mp/login_otp.jsp';
    window.open(externalUrl, '_self');
  }
}

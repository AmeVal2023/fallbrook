//tabs.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

//llama al router
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../Pages/home/home.module').then( m => m.HomePageModule)
        }]
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            loadChildren: () => import('../Pages/message/message.module').then( m => m.MessagePageModule)
        }]
      },
      {
        path: 'historial',
        children: [
          {
            path: '',
            loadChildren: () => import('../Pages/history/historial.module').then( m => m.HistorialPageModule)
        }]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () => import('../Pages/chat/chat.module').then( m => m.ChatPageModule)
        }]
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: () => import('../Pages/contact/contact.module').then( m => m.ContactPageModule)
        }]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

//tabs-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../Pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'message',
        loadChildren: () => import('../Pages/message/message.module').then(m => m.MessagePageModule)
      },
      {
        path: 'historial',
        loadChildren: () => import('../Pages/history/historial.module').then(m => m.HistorialPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../Pages/chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../Pages/contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('../Pages/blog/blog.module').then( m => m.BlogPageModule)
      },
      {
        path: 'blog-post/:postId',
        loadChildren: () => import('../Pages/blog-post/blog-post.module').then( m => m.BlogPostPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

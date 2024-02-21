import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage {

  posts: any[] = [];
  filteredPosts: any[] = [];
  selectedCategory: string = 'all';

  constructor(private router: Router, private newsService: NewsService) {}

  ionViewDidEnter() {
    // Cambia la carga de todos los posts a la carga específica de la categoría con ID 96
    this.newsService.getTopHeadlines('96').subscribe((data: any[]) => {
      this.posts = data;
      this.filterPosts(); // Filtra los posts después de cargarlos
    });
    // Cambia la carga de todos los posts a la carga específica de la categoría con ID 96
    this.loadPosts();
  }

  loadPosts() {
    const categoryId = this.getCategoryId(+this.selectedCategory);

    this.newsService.getTopHeadlines(categoryId.toString()).subscribe((data: any[]) => {
      this.posts = data;
      this.filterPosts(); // Filtra los posts después de cargarlos
    });
  }

  goToPostDetail(postId: number) {
    this.router.navigate(['tabs/blog-post', postId]);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
    this.loadPosts();
  }

  filterPosts() {
    if (this.selectedCategory === 'all' || this.selectedCategory === '96') {
      // Si la categoría es "all" o "96", muestra todos los posts
      this.filteredPosts = this.posts;
    } else {
      // Filtra los posts que pertenecen a la categoría seleccionada
      const categoryId = this.getCategoryId(+this.selectedCategory);
      console.log(`Posts filtrados para la categoría ${categoryId}`);
      this.filteredPosts = this.posts.filter(post => post.categories.includes(categoryId));
    }
  }

  getCategoryId(categoryId: number): number {
    // Ajusta la lógica según tus IDs de categorías
    switch (categoryId) {
      case 96:
        return 96;
      case 358:
        return 358;
      case 357:
        return 357;
      case 356:
        return 356;
      case 355:
        return 355;
      case 354:
        return 354;
      case 353:
        return 353;
      default:
        // Manejar cualquier otro caso o categoría desconocida
        return -1;
    }
  }
}

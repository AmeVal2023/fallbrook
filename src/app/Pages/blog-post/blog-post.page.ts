// blog-post.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.page.html',
  styleUrls: ['./blog-post.page.scss'],
})
export class BlogPostPage implements OnInit {
  postId: number = 0; 
  post: any;

  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit() {
    // Recupera el postId de los parámetros de la ruta
    this.activatedRoute.paramMap.subscribe((params) => {
      // Utiliza el operador de afirmación de tipo no nulo (!)
      this.postId = +params.get('postId')!;
      // Llama al servicio para recuperar los detalles del post
      this.newsService.getPostDetails(this.postId).subscribe((postDetails) => {
        // Asegúrate de que postDetails no sea null antes de asignarlo
        if (postDetails) {
          this.post = postDetails;
        }
      });
    });
  }  
}
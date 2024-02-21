// news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'https://www.fallbrookmedicalcenter.com/wp-json/wp/v2';
  
  constructor(private http: HttpClient) { }

  getTopHeadlines(categoryId?: string): Observable<any[]> {
    let url = `${this.apiUrl}/posts?_embed`;
    
    // Agrega la categoría a la URL si se proporciona
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }
    
    //console.log('URL de la solicitud:', url); // Agrega un log para verificar la URL 
    
    return this.http.get<any[]>(url);
  }
  
  getPostDetails(postId: number): Observable<any> {
    const url = `${this.apiUrl}/posts/${postId}?_embed`;
    return this.http.get<any>(url);
  }
  
}
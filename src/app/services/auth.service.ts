// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null; // Almacena la información del usuario autenticado
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Observable para el estado de autenticación

  constructor(private afAuth: AngularFireAuth) {
    // Suscribirse al estado de autenticación de AngularFireAuth
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = { email: user.email || '', password: '', confirmarPassword: '' };
        this.isAuthenticated.next(true);
      } else {
        this.user = null;
        this.isAuthenticated.next(false);
      }
    });
  }

  // Iniciar sesión con correo y contraseña
  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Obtener el usuario actualmente autenticado
  getUser(): User | null {
    return this.user;
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }
}

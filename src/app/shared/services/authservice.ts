import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthModel } from '../models/auth.model';
import { UserModel } from '../models/user.model';
import { HttpClient, httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  http = inject(HttpClient);
  user = signal<UserModel | null>(null);
  router = inject(Router);

  loadUser(): HttpResourceRef<UserModel | undefined> {
    return httpResource<UserModel>(() => {
      const request: HttpResourceRequest = {
        url: `${environment.apiUrl}/auth/me`,
        withCredentials: true
      }
      return request;
    })

  }

  login(email: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${environment.apiUrl}/auth/login`, { email, password },
      { withCredentials: true }).pipe(
        tap((userResponse) => {
          this.user.set(userResponse);
        })
      );

  }

  logout() {
    this.http.post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true }).subscribe({

      next: () => {
        this.user.set(null);
        this.router.navigate(['']);

      }


    })
  }
}

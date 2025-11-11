import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

export interface AuthUser {
  _id: string;
  userId?: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5050/api/auth';
  private readonly storageKey = 'betterme-auth';
  private readonly currentUserSubject = new BehaviorSubject<AuthResponse | null>(
    this.restoreSession()
  );

  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap((response) => this.persistSession(response)),
        catchError((error) => this.handleError(error, 'Login failed'))
      );
  }

  register(payload: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register`, payload, { withCredentials: true })
      .pipe(
        tap((response) => this.persistSession(response)),
        catchError((error) => this.handleError(error, 'Registration failed'))
      );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
  }

  get currentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return this.currentUserSubject.value?.token ?? null;
  }

  get userId(): string | null {
    const session = this.currentUserSubject.value;
    if (!session) {
      return null;
    }
    return session.user.userId ?? session.user._id ?? null;
  }

  private persistSession(response: AuthResponse): void {
    localStorage.setItem(this.storageKey, JSON.stringify(response));
    this.currentUserSubject.next(response);
  }

  private restoreSession(): AuthResponse | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as AuthResponse) : null;
    } catch (error) {
      console.warn('Unable to parse saved session', error);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse, fallbackMessage: string) {
    console.error('[AuthService] request failed', error);
    const message =
      error.error?.message ||
      error.message ||
      fallbackMessage ||
      'Something went wrong. Please try again.';
    return throwError(() => new Error(message));
  }
}
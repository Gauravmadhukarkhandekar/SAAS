import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html', 
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  profile: AuthUser | null = null;
  username: string = '';
  maskedPassword = '••••••••••';
  planLabel = '';

  loading = false;
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProfileFromSession();
    this.fetchProfileFromBackend();
  }

  /**
   * Username comes from session/token
   */
  private loadProfileFromSession(): void {
    const session = this.authService.currentUser;
    if (session?.user) {
      this.username = session.user.email;
    }
  }

  /**
   * Fetch authoritative profile data from backend
   */
  private fetchProfileFromBackend(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http
      .get<{ user: AuthUser }>(`${environment.apiUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`
        }
      })
      .subscribe({
        next: (response) => {
          this.profile = response.user;
          this.planLabel = this.formatPlan(response.user.subscriptionPlan);
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to load profile', error);
          this.errorMessage = 'Failed to load profile';
          this.loading = false;
        }
      });
  }

  private formatPlan(plan?: 'basic' | 'premium' | 'pro'): string {
    switch (plan) {
      case 'pro':
        return 'Pro';
      case 'premium':
        return 'Premium';
      default:
        return 'Basic';
    }
  }
}
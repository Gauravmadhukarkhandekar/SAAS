import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface HabitSummary {
  _id: string;
  userId?: string;
  name: string;
  description?: string;
  category?: string;
  frequency?: string;
  reminder?: string;
  reminderTime?: string;
  isActive?: boolean;
  currentStreak?: number;
  bestStreak?: number;
  lastCompletedDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HabitDetail extends HabitSummary {
  notes?: string;
}

interface HabitCollectionResponse<T = HabitSummary[]> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}

interface HabitEntityResponse<T = HabitDetail> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  private readonly baseUrl = 'http://localhost:5000/api';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getHabits(): Observable<HabitSummary[]> {
    let userId: string;
    try {
      userId = this.getUserIdOrThrow();
    } catch (error) {
      return throwError(() => (error instanceof Error ? error : new Error(String(error))));
    }
    return this.http
      .get<HabitCollectionResponse>(`${this.baseUrl}/habits/user/${userId}`, {
        withCredentials: true
      })
      .pipe(
        map((response) => response.data ?? []),
        catchError((error) => this.handleError(error, 'Failed to load habits'))
      );
  }

  getHabitById(id: string): Observable<HabitDetail> {
    return this.http
      .get<HabitEntityResponse>(`${this.baseUrl}/habits/${id}`, {
        withCredentials: true
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => this.handleError(error, 'Failed to load habit details'))
      );
  }

  createHabit(payload: Partial<HabitDetail>): Observable<HabitDetail> {
    let userId: string;
    try {
      userId = this.getUserIdOrThrow();
    } catch (error) {
      return throwError(() => (error instanceof Error ? error : new Error(String(error))));
    }
    const body = this.cleanPayload({
      userId,
      name: payload.name,
      description: payload.description,
      category: payload.category,
      frequency: payload.frequency,
      reminder: payload.reminder,
      isActive: payload.isActive ?? true
    });

    return this.http
      .post<HabitEntityResponse>(`${this.baseUrl}/habits`, body, {
        withCredentials: true
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => this.handleError(error, 'Failed to create habit'))
      );
  }

  updateHabit(id: string, payload: Partial<HabitDetail>): Observable<HabitDetail> {
    return this.http
      .put<HabitEntityResponse>(`${this.baseUrl}/habits/${id}`, this.cleanPayload(payload), {
        withCredentials: true
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => this.handleError(error, 'Failed to update habit'))
      );
  }

  deleteHabit(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/habits/${id}`, {
        withCredentials: true
      })
      .pipe(catchError((error) => this.handleError(error, 'Failed to delete habit')));
  }

  private getUserIdOrThrow(): string {
    const userId = this.authService.userId;
    if (!userId) {
      throw new Error('You must be logged in to manage habits.');
    }
    return userId;
  }

  private handleError(error: HttpErrorResponse, fallbackMessage: string) {
    console.error('[HabitsService] request failed', error);
    const message =
      error.error?.message ||
      error.message ||
      fallbackMessage ||
      'Something went wrong. Please try again.';
    return throwError(() => new Error(message));
  }

  private cleanPayload<T extends Record<string, unknown>>(input: T): T {
    const clone = { ...input };
    Object.keys(clone).forEach((key) => {
      if (clone[key] === undefined || clone[key] === null) {
        delete clone[key];
      }
    });
    return clone as T;
  }
}
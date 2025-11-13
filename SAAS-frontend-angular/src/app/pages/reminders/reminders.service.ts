import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemindersService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}
  
  getAllHabitsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/habits/user/${userId}`);
  }

  updateHabitReminderTime(habitId: string, date: string, time: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/habits/${habitId}/reminder-time`, { date, time });
  }
}

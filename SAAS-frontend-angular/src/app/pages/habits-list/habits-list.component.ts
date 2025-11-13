import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HabitsService, HabitSummary } from '../../services/habits.service';

@Component({
  selector: 'app-habits-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './habits-list.component.html',
  styleUrl: './habits-list.component.css'
})
export class HabitsListComponent implements OnInit {
  isLoading = true;
  errorMessage = '';
  habits: HabitSummary[] = [];

  constructor(private readonly habitsService: HabitsService) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  trackByHabitId(_: number, habit: HabitSummary): string {
    return habit._id;
  }

  loadHabits(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.habitsService.getHabits().subscribe({
      next: (habits) => {
        this.habits = habits;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Unable to load habits.';
        this.isLoading = false;
      }
    });
  }

  getReminderDisplay(habit: HabitSummary): string {
    // If reminderTime is None or not set, return dash
    if (!habit.reminderTime || habit.reminderTime === 'None') {
      return '—';
    }

    // If we have both date and time, format it nicely
    if (habit.reminderDate && habit.reminderTime !== 'None') {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      let dateLabel = '';
      if (habit.reminderDate === today) {
        dateLabel = 'Today';
      } else if (habit.reminderDate === tomorrow) {
        dateLabel = 'Tomorrow';
      } else if (habit.reminderDate === yesterday) {
        dateLabel = 'Yesterday';
      } else {
        const date = new Date(habit.reminderDate + 'T00:00:00');
        dateLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      }

      return `${dateLabel} · ${habit.reminderTime}`;
    }

    // If we only have time, just show the time
    return habit.reminderTime;
  }
}

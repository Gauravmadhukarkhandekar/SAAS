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
}

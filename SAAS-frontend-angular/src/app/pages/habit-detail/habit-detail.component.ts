import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HabitsService, HabitDetail } from '../../services/habits.service';

@Component({
  selector: 'app-habit-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './habit-detail.component.html',
  styleUrl: './habit-detail.component.css'
})
export class HabitDetailComponent implements OnInit {
  isLoading = true;
  errorMessage = '';
  habit?: HabitDetail;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly habitsService: HabitsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const habitId = params.get('id');
      if (!habitId) {
        this.errorMessage = 'Habit identifier was not provided.';
        this.isLoading = false;
        return;
      }
      this.fetchHabit(habitId);
    });
  }

  private fetchHabit(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.habitsService.getHabitById(id).subscribe({
      next: (habit) => {
        this.habit = habit;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Unable to load habit details.';
        this.isLoading = false;
      }
    });
  }
}

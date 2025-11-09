import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HabitsService, HabitDetail } from '../../services/habits.service';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent implements OnInit {
  readonly categories = [
    { label: 'Health', value: 'health' },
    { label: 'Fitness', value: 'fitness' },
    { label: 'Learning', value: 'learning' },
    { label: 'Productivity', value: 'productivity' },
    { label: 'Other', value: 'other' }
  ];

  readonly frequencies = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' }
  ];

  readonly reminders = [
    { label: 'Morning boost', value: 'morning' },
    { label: 'Midday focus', value: 'afternoon' },
    { label: 'Wind-down', value: 'evening' }
  ];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    category: ['health', Validators.required],
    frequency: ['daily', Validators.required],
    reminder: ['morning'],
    isActive: [true],
    notes: ['']
  });

  isSubmitting = false;
  isLoadingHabit = false;
  successMessage = '';
  errorMessage = '';
  habitId?: string;

  get pageTitle(): string {
    return this.habitId ? 'Edit Habit' : 'Create Habit';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly habitsService: HabitsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.habitId = id;
        this.fetchHabit(id);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { name, description, category, frequency, reminder, isActive, notes } =
      this.form.value;

    const payload: Partial<HabitDetail> = {
      name: name?.trim() ?? '',
      description: description?.trim() || undefined,
      category: category ?? undefined,
      frequency: frequency ?? undefined,
      reminder: reminder ?? 'morning',
      isActive: isActive ?? true,
      notes: notes?.trim() || undefined
    };

    const request$ = this.habitId
      ? this.habitsService.updateHabit(this.habitId, payload)
      : this.habitsService.createHabit(payload);

    request$.subscribe({
      next: (habit) => {
        this.successMessage = this.habitId
          ? 'Habit updated successfully.'
          : 'Habit created successfully.';
        this.isSubmitting = false;
        if (!this.habitId) {
          this.form.reset({
            name: '',
            description: '',
            category: 'health',
            frequency: 'daily',
            reminder: 'morning',
            isActive: true,
            notes: ''
          });
        } else {
          this.router.navigate(['/habits', habit._id]);
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'We could not save the habit. Please retry.';
        this.isSubmitting = false;
      }
    });
  }

  get name() {
    return this.form.get('name');
  }

  get frequency() {
    return this.form.get('frequency');
  }

  private fetchHabit(id: string): void {
    this.isLoadingHabit = true;
    this.habitsService.getHabitById(id).subscribe({
      next: (habit: HabitDetail) => {
        this.form.patchValue({
          name: habit.name,
          description: habit.description ?? '',
          category: habit.category ?? 'health',
          frequency: habit.frequency ?? 'daily',
          reminder: habit.reminder ?? 'morning',
          isActive: habit.isActive ?? true,
          notes: habit.notes ?? ''
        });
        this.isLoadingHabit = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Unable to load habit for editing.';
        this.isLoadingHabit = false;
      }
    });
  }
}

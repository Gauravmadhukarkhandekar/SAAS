import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  summaryTiles = [
    { label: 'Completion Rate', value: '82%', trend: '+6% vs last week' },
    { label: 'Average Streak', value: '9.4 days', trend: '+2.1 days' },
    { label: 'Morning Focus Score', value: '7.8 / 10', trend: 'Steady' },
    { label: 'Reflections Logged', value: '36', trend: '+12 entries' }
  ];

  cadenceBreakdown = [
    { label: 'Daily', value: 58 },
    { label: 'Weekly', value: 27 },
    { label: 'Bi-weekly', value: 10 },
    { label: 'Custom', value: 5 }
  ];

  momentumTimeline = [
    { day: 'Mon', value: 72 },
    { day: 'Tue', value: 78 },
    { day: 'Wed', value: 88 },
    { day: 'Thu', value: 64 },
    { day: 'Fri', value: 92 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: 80 }
  ];
}

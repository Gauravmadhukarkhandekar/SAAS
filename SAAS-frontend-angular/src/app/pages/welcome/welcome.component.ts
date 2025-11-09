import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  heroStats = [
    { label: 'Habits Tracked', value: '50K+' },
    { label: 'Avg. Success Rate', value: '85%' },
    { label: 'Daily Check-ins', value: '120K' }
  ];

  featureCards = [
    {
      icon: '📈',
      title: 'Visual Progress',
      description: 'Glanceable charts help you stay accountable and celebrate streaks.'
    },
    {
      icon: '🤖',
      title: 'AI Habit Coach',
      description: 'Personalized nudges keep you consistent when motivation dips.'
    },
    {
      icon: '⏰',
      title: 'Smart Reminders',
      description: 'Adaptive reminders fit your rhythm, not the other way around.'
    },
    {
      icon: '🎯',
      title: 'Goal Pathways',
      description: 'Break big goals into micro habits with progress milestones.'
    }
  ];

  workflowSteps = [
    {
      number: '01',
      title: 'Define Your Habit Blueprint',
      description: 'Set intention, schedule, and accountability in under five minutes.'
    },
    {
      number: '02',
      title: 'Track with Guided Nudges',
      description: 'Daily prompts and reflections keep progress top-of-mind.'
    },
    {
      number: '03',
      title: 'Review & Celebrate',
      description: 'See trends, spot blockers, and keep momentum with data-driven wins.'
    }
  ];

  testimonials = [
    {
      quote:
        'BetterMe transformed the way our wellness team builds lasting routines. The streak insights are game changing.',
      author: 'Sara Mitchell',
      role: 'Head of People Ops, Flow Labs'
    },
    {
      quote:
        'I tried a dozen habit apps. This is the first that adapts to my day instead of nagging me. I finally hit my 90-day meditation streak.',
      author: 'Andre Lewis',
      role: 'Product Designer'
    }
  ];
}

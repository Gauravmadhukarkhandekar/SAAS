import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})
export class RemindersComponent {
  upcomingReminders = [
    {
      habit: 'Morning Journaling',
      time: 'Tomorrow · 7:00 AM',
      channel: 'Mobile push',
      tone: 'Reflective boost'
    },
    {
      habit: 'Hydration Reset',
      time: 'Today · 3:00 PM',
      channel: 'Slack DM',
      tone: 'Playful nudge'
    },
    {
      habit: 'Evening Meditation',
      time: 'Today · 8:30 PM',
      channel: 'Email digest',
      tone: 'Calm cue'
    }
  ];

  channels = [
    { label: 'Mobile Push', description: 'Real-time pings on iOS & Android.' },
    { label: 'Email Digest', description: 'Daily briefing with insights.' },
    { label: 'Slack Bot', description: 'Bring your habits into team rituals.' },
    { label: 'SMS', description: 'Minimal reminders for focus.' }
  ];
}

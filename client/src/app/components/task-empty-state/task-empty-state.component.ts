import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-task-empty-state',
  template: `<div class="flex flex-col items-center justify-center py-20 px-6 text-center">
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" class="opacity-60">
      <rect x="20" y="20" width="80" height="60" rx="12" fill="var(--muted)" />
      <rect x="32" y="36" width="24" height="4" rx="2" fill="var(--switch-background)" />
      <rect x="32" y="46" width="40" height="4" rx="2" fill="var(--switch-background)" />
      <rect x="32" y="56" width="32" height="4" rx="2" fill="var(--switch-background)" />
      <circle cx="20" cy="20" r="10" fill="var(--accent)" opacity="0.5" />
      <path
        d="M15 20l3.5 3.5L25 15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="98" cy="76" r="8" fill="var(--secondary)" />
      <path
        d="M98 72v4M98 78v1"
        stroke="var(--switch-background)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
    <h3 class="text-lg font-semibold text-foreground mb-2">All clear!</h3>
    <p class="text-sm text-muted-foreground max-w-xs">
      <ng-content>You have no tasks at the moment.</ng-content>
    </p>
  </div>`,
})
export class TaskEmptyStateComponent {}

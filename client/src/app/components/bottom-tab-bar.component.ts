import { Component, input, output } from '@angular/core';

import { NavView } from '../models/task.model';

@Component({
  selector: 'app-bottom-tab-bar',
  standalone: true,
  template: `
    <nav
      class="fixed bottom-3 left-3 right-3 z-30 hidden gap-2 rounded-full border border-white/90 bg-white/92 p-2 shadow-(--shadow-soft) max-[959px]:flex"
      aria-label="Mobile task views"
    >
      @for (item of tabs; track item.id) {
        <button
          type="button"
          [class]="
            view() === item.id
              ? 'min-h-11 flex-1 rounded-full bg-accent font-bold text-white transition duration-150 ease-linear'
              : 'min-h-11 flex-1 rounded-full font-bold text-muted-foreground transition duration-150 ease-linear hover:bg-muted'
          "
          (click)="viewChange.emit(item.id)"
        >
          <span>{{ item.label }}</span>
        </button>
      }
    </nav>
  `,
})
export class BottomTabBarComponent {
  readonly view = input.required<NavView>();
  readonly viewChange = output<NavView>();

  protected readonly tabs: Array<{ id: NavView; label: string }> = [
    { id: 'projects', label: 'Projects' },
    { id: 'completed', label: 'Done' },
  ];
}

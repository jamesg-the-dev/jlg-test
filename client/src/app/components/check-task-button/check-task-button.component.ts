import { Component, input, output } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-check-task-button',
  standalone: true,
  template: `<button
    type="button"
    [appTooltip]="done() ? 'Mark incomplete' : 'Mark complete'"
    class="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    [class]="done() ? 'border-accent bg-accent text-white' : ''"
    [attr.aria-label]="done() ? 'Mark incomplete' : 'Mark complete'"
    (click)="onToggle($event)"
  >
    @if (done()) {
      <span class="material-symbol symbol-filled text-base" aria-hidden="true">check</span>
    }
  </button>`,
  imports: [TooltipDirective],
})
export class CheckTaskButtonComponent {
  readonly done = input(false);
  readonly completed = output<void>();

  protected onToggle(event: Event): void {
    event.stopPropagation();
    this.completed.emit();
  }
}

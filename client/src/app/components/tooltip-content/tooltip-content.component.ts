import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip-content',
  standalone: true,
  template: `<div class="tooltip-bubble">{{ text() }}</div>`,
  styles: [
    `
      :host {
        position: relative;
        display: block;
        pointer-events: none;
      }

      .tooltip-bubble {
        padding: 0.3rem 0.5rem;
        border-radius: calc(var(--radius) - 4px);
        background: var(--primary);
        color: var(--primary-foreground);
        font-size: calc(var(--font-size) * 0.75);
        font-weight: var(--font-weight-normal);
        line-height: 1.4;
        width: max-content;
        max-width: 220px;
        box-shadow: var(--shadow-task-card-hover);
      }
    `,
  ],
})
export class TooltipContentComponent {
  text = input.required<string>();
}

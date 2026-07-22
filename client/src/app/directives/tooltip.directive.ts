import { Directive, ElementRef, inject, input, DestroyRef, afterNextRender } from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipContentComponent } from '../components/tooltip-content/tooltip-content.component';

const TOOLTIP_DELAY = 150;

const POSITIONS: ConnectedPosition[] = [
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8,
  },
  {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8,
  },
];

const NATIVELY_FOCUSABLE = new Set([
  'A',
  'BUTTON',
  'INPUT',
  'SELECT',
  'TEXTAREA',
  'AUDIO',
  'VIDEO',
  'DETAILS',
]);

@Directive({
  selector: '[appTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
    '(keydown.escape)': 'hide()',
  },
})
export class TooltipDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly overlay = inject(Overlay);
  private readonly positionBuilder = inject(OverlayPositionBuilder);
  private readonly destroyRef = inject(DestroyRef);

  appTooltip = input.required<string>();

  private overlayRef: OverlayRef | null = null;
  private showTimeout?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => this.destroyOverlay());

    // Ensure non-interactive elements (div, span, etc.) are keyboard reachable
    afterNextRender(() => {
      const el = this.elementRef.nativeElement;
      const isNativelyFocusable = NATIVELY_FOCUSABLE.has(el.tagName);
      const isAlreadyInTabOrder = el.hasAttribute('tabindex');

      if (!isNativelyFocusable && !isAlreadyInTabOrder) {
        el.setAttribute('tabindex', '0');
      }
    });
  }

  show() {
    if (!this.appTooltip()) return;

    clearTimeout(this.showTimeout);
    this.showTimeout = setTimeout(() => this.attachOverlay(), TOOLTIP_DELAY);
  }

  hide() {
    clearTimeout(this.showTimeout);
    this.destroyOverlay();
  }

  private attachOverlay(): void {
    if (this.overlayRef?.hasAttached()) return;

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(POSITIONS)
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new ComponentPortal(TooltipContentComponent);
    const componentRef = this.overlayRef.attach(portal);

    componentRef.setInput('text', this.appTooltip());
  }

  private destroyOverlay(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}

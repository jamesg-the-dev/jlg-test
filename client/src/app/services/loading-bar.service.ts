import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingBarService {
  private readonly activeRequestCount = signal(0);

  private readonly isLoadingSignal = signal(false);
  readonly isLoading: Signal<boolean> = this.isLoadingSignal.asReadonly();

  show(): void {
    this.activeRequestCount.update((count) => count + 1);
    this.isLoadingSignal.set(true);
  }

  hide(): void {
    this.activeRequestCount.update((count) => Math.max(0, count - 1));

    if (this.activeRequestCount() === 0) {
      this.isLoadingSignal.set(false);
    }
  }
}

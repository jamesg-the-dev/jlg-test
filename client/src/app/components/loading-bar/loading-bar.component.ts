import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LoadingBarService } from '../../services/loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loadingBarService.isLoading()) {
      <div class="loading-bar-track" role="progressbar" aria-label="Loading">
        <div class="loading-bar-inner"></div>
      </div>
    }
  `,
  styleUrl: './loading-bar.component.css',
})
export class LoadingBarComponent {
  protected readonly loadingBarService = inject(LoadingBarService);
}

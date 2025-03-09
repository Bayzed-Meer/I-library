import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavbarComponent } from '@shared';
import { FilterComponent, BookCollectionsComponent } from '@features';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-books',
  imports: [
    NavbarComponent,
    FilterComponent,
    BookCollectionsComponent,
    MatSidenavModule,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected filter = viewChild(MatSidenav);

  protected isFilterVisible = signal(false);
  protected isMobileDevice = toSignal(
    this.breakpointObserver.observe('(max-width: 1024px)').pipe(
      map(result => {
        this.isFilterVisible.set(!result.matches);
        return result.matches;
      })
    ),
    { initialValue: false }
  );

  protected showFilter(): void {
    this.filter()?.open();
  }

  protected hideFilter(): void {
    this.filter()?.close();
  }
}

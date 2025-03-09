import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BookListComponent, BookCardComponent } from '@features';

@Component({
  selector: 'app-book-collections',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    BookListComponent,
    BookCardComponent,
  ],
  templateUrl: './book-collections.component.html',
  styleUrl: './book-collections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCollectionsComponent implements OnInit {
  isMobileDevice = input.required<boolean>();
  protected showFilter = output<void>();

  protected view = signal<'list' | 'card'>('list');

  ngOnInit(): void {
    const storedView = this.getViewFromLocalStorage();
    this.view.set(storedView);
  }

  protected onFilterClick(): void {
    this.showFilter.emit();
  }

  protected toggleView(): void {
    const newValue = this.view() === 'list' ? 'card' : 'list';
    this.view.set(newValue);
    this.setViewInLocalStorage(this.view());
  }

  private setViewInLocalStorage(view: 'list' | 'card'): void {
    localStorage.setItem('view', view);
  }

  private getViewFromLocalStorage(): 'list' | 'card' {
    const storedView = localStorage.getItem('view');
    return storedView === 'card' ? 'card' : 'list';
  }
}

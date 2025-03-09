import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookOverviewComponent, BookReviewsComponent } from '@features';
import {
  NavbarComponent,
  FooterComponent,
  BookListingComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
} from '@shared';
@Component({
  selector: 'app-book-details',
  imports: [
    NavbarComponent,
    BookReviewsComponent,
    MatIconModule,
    MatButtonModule,
    FooterComponent,
    BookListingComponent,
    BreadcrumbComponent,
    BookOverviewComponent,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent {
  protected breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Books', link: '/books' },
    { label: 'Data Structure & Algorithms' },
  ];
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RatingStarsComponent } from '@shared';

@Component({
  selector: 'app-book-listing',
  imports: [RatingStarsComponent],
  templateUrl: './book-listing.component.html',
  styleUrl: './book-listing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListingComponent {
  title = input.required<string>();
  actionText = input<string>();

  products = [
    {
      title: 'The C++ Programming Language',
      author: 'Bjarne Stroustrup',
      image: 'book-details.png',
      rating: '4.8',
      sold: '1,238',
    },
    {
      title: 'Introduction to Java Programming',
      author: 'K. Somasundaram',
      image: 'book-details.png',
      rating: '4.8',
      sold: '1,238',
    },
    {
      title: 'PostgreSQL',
      author: 'Bjarne Stroustrup',
      image: 'book-details.png',
      rating: '4.8',
      sold: '1,238',
    },
    {
      title: 'Data Structures and Algorithms Made Easy',
      author: 'Narasimha Karumanchi',
      image: 'book-details.png',
      rating: '4.8',
      sold: '1,238',
    },
    {
      title: 'Loving Literature',
      author: 'A. Castiglia',
      image: 'book-details.png',
      rating: '4.8',
      sold: '1,238',
    },
    {
      title: 'Data Structures and Algorithms Made Easy',
      author: 'Narasimha Karumanchi',
      image: 'book-details.png',
      rating: '4.8',
      sold: '1,238',
    },
  ];
}

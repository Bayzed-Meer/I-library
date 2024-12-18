import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookRecordComponent } from './book-record/book-record.component';
import { BooksApprovalComponent } from './books-approval/books-approval.component';
import { BooksDetailsComponent } from './books-details/books-details.component';
import { BooksComponent } from './books/books.component';
import { BorrowHistoryComponent } from './borrow-history/borrow-history.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { HeroSectionComponent } from './home/hero-section/hero-section.component';
import { HomeComponent } from './home/home.component';
import { KeyFeatureComponent } from './home/key-feature/key-feature.component';
import { ServiceComponent } from './home/service/service.component';
import { IssuedBooksComponent } from './issued-books/issued-books.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestedBooksComponent } from './requested-books/requested-books.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        SignInComponent,
        SignUpComponent,
        BooksComponent,
        CreateBookComponent,
        BookDetailsComponent,
        StudentInfoComponent,
        DashboardComponent,
        ProfileComponent,
        BorrowedBooksComponent,
        RequestedBooksComponent,
        BookRecordComponent,
        EditProfileComponent,
        ChangePasswordComponent,
        BooksApprovalComponent,
        IssuedBooksComponent,
        BorrowHistoryComponent,
        UsersDetailsComponent,
        UpdateBookComponent,
        BooksDetailsComponent,
        NavbarComponent,
        HeroSectionComponent,
        AboutComponent,
        KeyFeatureComponent,
        ContactComponent,
        ServiceComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatChipsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatListModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        CheckboxModule,
        RatingModule,
        FieldsetModule,
        AutoFocusModule,
        MatProgressBarModule,
        DividerModule,
        InputTextareaModule,
        FileUploadModule,
        MatSnackBarModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}

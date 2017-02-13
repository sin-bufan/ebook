import { CatalogPopoverComponent } from './../components/catalog-popover/catalog-popover';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { EBook } from './app.component';
import { HomePage } from '../pages/home/home';
import { EPubPage } from '../pages/epub/epub';
import { BooksData } from '../providers/books-data';
@NgModule({
  declarations: [
    EBook,
    HomePage,
    EPubPage,
    CatalogPopoverComponent
  ],
  imports: [
    IonicModule.forRoot(EBook)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    EBook,
    HomePage,
    EPubPage,
    CatalogPopoverComponent
  ],
  providers: [BooksData, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }

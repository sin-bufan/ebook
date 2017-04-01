import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { EBook } from './app.component';
import { HomePage } from '../pages/home/home';
import { EPubPage } from '../pages/epub/epub';

import { CatalogPopoverComponent } from './../components/catalog-popover/catalog-popover';

import { AppProviders } from './app.providers';

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
  providers: AppProviders.getProviders()
})
export class AppModule { }

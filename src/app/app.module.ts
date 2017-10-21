import { BrowserModule} from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { EBook } from './app.component';
import { HomePage } from '../pages/home/home';
import { EPubPage } from '../pages/epub/epub';

import { StylesPopoverComponent } from './../components/styles-popover/styles-popover';
import { CatalogComponent } from './../components/catalog/catalog';

import { BooksData } from '../providers/books-data';
import { ScreenOrientationProvider, StatusBarProvider, SplashScreenProvider} from './app.providers';
import { HttpModule } from "@angular/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';//动画

import { IonicImageViewerModule } from 'ionic-img-viewer';//看图模块
@NgModule({
  declarations: [
    EBook,
    HomePage,
    EPubPage,
    StylesPopoverComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,HttpModule,BrowserAnimationsModule,IonicImageViewerModule,
    IonicModule.forRoot(EBook)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    EBook,
    HomePage,
    EPubPage,
    StylesPopoverComponent,
    CatalogComponent
  ],
  providers: [
    BooksData,
    StatusBarProvider,
    SplashScreenProvider,
    ScreenOrientationProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

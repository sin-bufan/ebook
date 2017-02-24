import { ScreenOrientation } from 'ionic-native';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BooksData } from '../../providers/books-data';
import { EPubPage } from '../epub/epub'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shelf: any = [{ "books": [] }];//列表
  languageIndex: number = 0;
  constructor(public navCtrl: NavController,
    public bookDataService: BooksData,
    public platform: Platform) {

  }
  ionViewDidLoad() {
    this.bookDataService.getBooks().then((data) => {
      this.shelf = data.shelf;
    });
  }
  ionViewDidEnter() {
    try {
      if (this.platform.is("android") || this.platform.is("ios")) {
        //ScreenOrientation.lockOrientation("landscape");
      }
    } catch (e) { console.log(e) }
  }
  openItem(item) {
    this.navCtrl.push(EPubPage, { "book": item });
    if (this.platform.is("android") || this.platform.is("ios")) {
      switch (item.lockOrientation) {
        case "landscape":
        case "portrait":
        case "landscape-primary":
        case "portrait-primary":
        case "landscape-secondary":
        case "portrait-secondary":
          //ScreenOrientation.lockOrientation(item.lockOrientation);
          break;
        default:
          //ScreenOrientation.unlockOrientation();
          break;
      }
    }
  }
}

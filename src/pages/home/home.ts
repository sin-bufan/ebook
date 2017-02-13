import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
    public bookDataService: BooksData) {

  }
  ionViewDidLoad() {
    this.bookDataService.getBooks().then((data) => {
      this.shelf = data.shelf;
    });
  }
  openItem(item) {
    this.navCtrl.push(EPubPage, { "book": item });
  }
}

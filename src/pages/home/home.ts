import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BooksData } from '../../providers/books-data';
import { EPubPage } from '../epub/epub'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shelfs: any = [];//列表
  shelf:any = {books:[]};
  constructor(private navCtrl: NavController,
    private bookDataService: BooksData,
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    private imageViewerCtrl: ImageViewerController, ) {

  }
  ionViewDidLoad() {
    this.bookDataService.getBooks().then((data) => {
      this.shelfs = data.shelfs;
      this.shelf = this.shelfs[0];
    });
  }
  ionViewDidEnter() {
    try {
      //if (this.platform.is("android") || this.platform.is("ios")) {
      this.screenOrientation.lock("landscape");
      //}
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
          this.screenOrientation.lock(item.lockOrientation);
          break;
        default:
          this.screenOrientation.unlock();
          break;
      }
    }
  }
  showPic(event) {
    try {
      let imageViewer = this.imageViewerCtrl.create(event.target);
      imageViewer.present();
    } catch (e) { console.log(e) }
  }

  selectLanguage(item){
    this.shelf = item;
  }
}

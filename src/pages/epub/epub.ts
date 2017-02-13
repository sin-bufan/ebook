import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { CatalogPopoverComponent } from './../../components/catalog-popover/catalog-popover'
import * as ePub from 'epubjs/build/epub';
/*
  Generated class for the EBook page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-epub',
  templateUrl: 'epub.html'
})
export class EPubPage {
  book: any;
  epub: any;
  toc: any;
  currentPage: number = 1;
  //totalPages: number = 1;
  epubOption: any = {
    bookPath: null,
    version: 1, // Changing will cause stored Book information to be reloaded
    restore: false, // Skips parsing epub contents, loading from localstorage instead
    storage: false, // true (auto) or false (none) | override: 'ram', 'websqldatabase', 'indexeddb', 'filesystem'
    spreads: false, // Displays two columns
    fixedLayout: false, //-- Will turn off pagination
    styles: {}, // Styles to be applied to epub
    width: false,
    height: false,
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {
    this.book = navParams.data.book;
    //this.epubOption.width = 1024;
    //this.epubOption.height = 768;
    //this.epubOption.bookPath = this.book
    this.epub = ePub(this.epubOption);
  }
  ionViewDidLoad() {

    this.epub.open(this.book.epubURL);

    this.epub.renderTo("epubArea");

    this.epub.getMetadata().then((meta) => {
      console.log("MATA: ", meta);
    });

    this.epub.getToc().then((toc) => {
      console.log("TOC: ", toc);
      this.toc = toc;
    });
    this.epub.pageListReady.then((pageList) => {
      console.info("EPUB: ", this.epub);
    });

    // this.epub.generatePagination().then((pageList) => {
    //   // console.log("Pagination:");
    //   // console.log(pageList);
    //   // this.totalPages = pageList.length;
    //   //this.totalPages = this.epub.pagination.totalPages;
    // });
    this.epub.on('book:ready', () => {
      console.info("EPUB: ", this.epub);
    });
    // this.epub.on('book:pageChanged', (location) => {
    //   //这个事件会被触发2次，是Epub.js的问题.......
    //   console.log("PAGE CHANGED TO LOCATION: ", location);
    //   console.log("CURRENT PAGE NO: ", this.epub.pagination.pageFromCfi(this.epub.getCurrentLocationCfi()));
    // });

  }

  ionViewWillUnload() {
    this.epub.destroy();
  }
  // //显示目录
  showCatalog(event) {
    let popover = this.popoverCtrl.create(CatalogPopoverComponent, this.toc);
    //关闭后的处理
    popover.onDidDismiss(chapter => {
      if (chapter != null) {
        console.log("target CFI: " + JSON.stringify(chapter));
        this.epub.displayChapter(chapter.href);
      }
    });
    popover.present({ ev: event });
  }
  nav(event) {
    console.log("nav Event: " + JSON.stringify(event));
  }
  nextPage(){
    this.currentPage++;
    console.log(this.currentPage);
    this.epub.gotoPage(this.currentPage);
  }
   prevPage(){
    this.currentPage--;
    console.log(this.currentPage);
    this.epub.gotoPage(this.currentPage);
  }
}

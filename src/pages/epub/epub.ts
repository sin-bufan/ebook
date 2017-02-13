import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    public navParams: NavParams
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

    this.epub.generatePagination().then((pageList) => {
      // console.log("Pagination:");
      // console.log(pageList);
      // this.totalPages = pageList.length;
      //this.totalPages = this.epub.pagination.totalPages;
    });
    this.epub.on('book:ready', () => {
      console.info("EPUB: ", this.epub);
    });
    this.epub.on('book:pageChanged', (location) => {
      //这个事件会被触发2次，是Epub.js的问题.......
      console.log("PAGE CHANGED TO LOCATION: ", location);
      console.log("CURRENT PAGE NO: ", this.epub.pagination.pageFromCfi(this.epub.getCurrentLocationCfi()));
      // if (this.currentPage != this.epub.pagination.pageFromCfi(this.epub.getCurrentLocationCfi())) {
      this.currentPage = this.epub.pagination.pageFromCfi(this.epub.getCurrentLocationCfi());
      // }
    });

    // this.book.setStyle("font-size", "1em");
    // this.book.setStyle("background-color", "0");
    // this.book.setStyle("color", "ffffff");
    //键盘监听
    // ePub.Hooks.register("beforeChapterDisplay").pageTurns = function (callback, renderer) {
    //   var lock = false;
    //   var arrowKeys = function (e) {
    //     e.preventDefault();
    //     if (lock) return;

    //     if (e.keyCode == 37) {
    //       this.epub.prevPage();
    //       lock = true;
    //       setTimeout(function () {
    //         lock = false;
    //       }, 100);
    //       return false;
    //     }

    //     if (e.keyCode == 39) {
    //       this.epub.nextPage();
    //       lock = true;
    //       setTimeout(function () {
    //         lock = false;
    //       }, 100);
    //       return false;
    //     }

    //   };
    //   renderer.doc.addEventListener('keydown', arrowKeys, false);
    //   if (callback) callback();
    // }
  }

  ionViewWillUnload() {
    this.epub.destroy();
  }
  // //显示目录
  showCatalog(event) {
    console.log(this.epub);
    //console.log(this.currentPage);
  }
  // //翻页
  // navPage(event) {
  //   console.log(event);
  //   this.epub.nextPage();
  // }
}

import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, Platform } from 'ionic-angular';
import { CatalogPopoverComponent } from './../../components/catalog-popover/catalog-popover'
import * as ePub from 'epubjs/build/epub';

@Component({
  selector: 'page-epub',
  templateUrl: 'epub.html'
})
export class EPubPage {
  book: any;
  epub: any;
  toc: any;
  toolbarVisible:boolean=true;
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
    public popoverCtrl: PopoverController,
    public platform: Platform
  ) {
    this.book = navParams.data.book;
    //this.epubOption.width = platform.width();
    //this.epubOption.height = platform.height();
    //this.epubOption.bookPath = this.book
    this.epub = ePub(this.epubOption);
  }
  ionViewDidLoad() {
    console.log(this.epubOption);
    this.epub.open(this.book.epubURL);
    //this.epub = ePub(this.epubOption);

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
      console.log("Pagination length: ", this.epub.pagination.totalPages);
      // console.log(pageList);
      // this.totalPages = pageList.length;
      //this.totalPages = this.epub.pagination.totalPages;
    });
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
    if (this.toc == null) { return; }
    let popover = this.popoverCtrl.create(CatalogPopoverComponent, this.toc);
    //关闭后的处理
    popover.onDidDismiss(chapter => {
      if (chapter != null) {
        console.log("target CFI: " + JSON.stringify(chapter));
        this.epub.goto(chapter.href);
      }
    });
    popover.present({ ev: event });
  }
  switchMode(){
    console.log(this.toolbarVisible)
    this.toolbarVisible = !this.toolbarVisible;
  }
  nav(event) {
    console.log("nav Event: " + JSON.stringify(event));
    this.nextPage();
  }
  nextPage() {
    this.currentPage++;
    console.log(this.currentPage,this.platform.width(),this.platform.height());
    this.epub.gotoPage(this.currentPage);
  }
  prevPage() {
    this.currentPage--;
    console.log(this.currentPage);
    this.epub.gotoPage(this.currentPage);
  }
}

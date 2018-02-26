import { Component, ChangeDetectorRef } from '@angular/core';
//import { ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavParams, PopoverController, LoadingController, MenuController, Events } from 'ionic-angular';
import { Gesture } from "ionic-angular/gestures/gesture";
import { StylesPopoverComponent } from './../../components/styles-popover/styles-popover'
import { ImageViewerController } from 'ionic-img-viewer';
import ePub from 'epubjs/build/epub';

//declare var EPUBJS: any;
@Component({
  selector: 'page-epub',
  templateUrl: 'epub.html',
  //头部底部显示 、 隐藏动画效果
  animations: [
    trigger('showState', [
      //隐藏状态
      state('hide', style({ opacity: 0, display: 'none' })),
      //显示状态
      state('show', style({ opacity: 1, display: 'block' })),
      //动画
      transition('hide => show', [
        animate(500, keyframes([
          style({ opacity: 0, offset: 0, display: 'block' }),
          style({ opacity: 1, offset: 1, display: 'none' })
        ]))
      ]),
      transition('show => hide', [
        animate(500, keyframes([
          style({ opacity: 1, offset: 0, display: 'block' }),
          style({ opacity: 0, offset: 1, display: 'none' })
        ]))
      ])
    ])
  ]
})
export class EPubPage {
  book: any;
  epub: any;
  toc: any;
  hasCatalog:boolean=false;
  toolbarShowState: string = "hide";
  currentPage: number = 1;
  gesture: Gesture;
  epubOption: any = {
    bookPath: null,
    version: 1, // Changing will cause stored Book information to be reloaded
    restore: true, // Skips parsing epub contents, loading from localstorage instead
    storage: false, // true (auto) or false (none) | override: 'ram', 'websqldatabase', 'indexeddb', 'filesystem'
    spreads: false, // Displays two columns
    fixedLayout: false, //-- Will turn off pagination
    styles: { "margin": "0px", "padding": "0px" }, // Styles to be applied to epub
  }
  constructor(
    navParams: NavParams,
    private popoverCtrl: PopoverController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private ref: ChangeDetectorRef,
    private imageViewerCtrl: ImageViewerController,
    private events: Events
  ) {
    this.book = navParams.data.book;
    if (this.book.type == "epub2") {
      this.epubOption.styles = { "margin": "10px" };
    }
    this.epub = ePub(this.epubOption);
  }
  //加载图书，初始化
  ionViewDidLoad() {
    this.epub.open(this.book.epubURL);
    this.epub.renderTo("epubArea");
    //MATADATA
    this.epub.getMetadata().then((meta) => {
      //console.log("MATA: ", meta);
    });
    //目录
    this.epub.getToc().then((toc) => {
      console.log("TOC: ", toc);
      this.initTOC(toc)
    });
    //分页
    let loader = this.loadingCtrl.create({
      content: "正在分页...",
      duration: 0
    });
    loader.present();
    this.epub.generatePagination().then((pageList) => {
      this.currentPage = this.epub.pagination.firstPage;
      this.epub.gotoPage(this.currentPage);
      // var currentLocation = this.epub.getCurrentLocationCfi();
      // if (currentLocation!=null)
      //   this.currentPage = this.epub.pagination.pageFromCfi(currentLocation);
      loader.dismiss();
    });
    //其他
    this.epub.on('book:ready', () => {
      console.info("EPUB: ", this.epub);
    });
    this.epub.on('renderer:chapterDisplayed', (location) => {
      this.initBookGesture();
      this.initBookPageAnimation();
    });
    //页面变化之后
    this.epub.on('book:pageChanged', (location) => {
      this.currentPage = location.anchorPage;
      console.log('------book:pageChanged------', location);
      console.log("currentPage", this.currentPage);
      this.ref.detectChanges();
    });
    // this.epub.on('renderer:locationChanged', (locationCfi) => {
    //   var currentLocation = this.epub.getCurrentLocationCfi();
    //   var currentPage = this.epub.pagination.pageFromCfi(currentLocation);
    //   console.log('------renderer:locationChanged------',locationCfi);
    //   console.log("currentPage", currentPage);
    // });
  }

  ionViewWillLeave() {
    if (this.gesture) {
      this.gesture.destroy();
    }
    this.events.unsubscribe("SELECT_CATALOG_MENU");
    this.events.publish('UPDATE_CATALOG_MENU', null);
    this.epub.destroy();
  }
  //翻页动画（只在同一章节内部翻页的时候生效）
  initBookPageAnimation() {
    let style = this.epub.renderer.doc.createElement("style");
    style.innerHTML = "*{-webkit-transition: transform {t} ease;-moz-transition: tranform {t} ease;-o-transition: transform {t} ease;-ms-transition: transform {t} ease;transition: transform {t} ease;}";
    style.innerHTML = style.innerHTML.split("{t}").join("0.5s");
    this.epub.renderer.doc.body.appendChild(style);
  }
  //手势控制
  initBookGesture() {
    if (this.gesture) { this.gesture.destroy(); }
    //this.gesture = new Gesture(this.epub.renderer.doc);
    this.gesture = new Gesture(this.epub.renderer.doc.body);
    this.gesture.listen();
    //双击--显示隐藏顶部标题栏和底部工具栏
    // this.gesture.on('doubletap', (event) => {
    //   console.log('doubletap: ', event);
    //   switch (this.toolbarShowState) {
    //     case "show"://显示
    //       this.toolbarShowState = "hide";
    //       break;
    //     case "hide"://隐藏
    //       this.toolbarShowState = "show";
    //       break;
    //   }
    //   this.ref.detectChanges();
    // });
    //翻页手势 swipe手势
    this.gesture.on('swipe', (event) => {
      console.log('swipe: ', event, event.direction);
      const PAN_LEFT: Number = 2;
      const PAN_RIGHT: Number = 4;
      if (event.direction == PAN_LEFT) {
        this.nextPage();
      } else if (event.direction == PAN_RIGHT) {
        this.prevPage();
      }
    });
    //点击，边缘翻页，其他地方显示图片
    this.gesture.on('tap', (event) => {
      console.log('tap: ', event);
      //边缘翻页
      let EDGE_WIDTH = 100;
      if (event.center.x > window.innerWidth - EDGE_WIDTH) {
        this.nextPage();
      } else if (event.center.x < EDGE_WIDTH) {
        this.prevPage();
      } else {
        //点击其他地方，显示菜单
        switch (this.toolbarShowState) {
          case "show"://显示
            this.toolbarShowState = "hide";
            break;
          case "hide"://隐藏
            this.toolbarShowState = "show";
            break;
        }
        this.ref.detectChanges();
      }
      //this.ref.detectChanges();
    });
    //按住手势，显示图片
    this.gesture.on('press', (event) => {
      console.log('pressed!!');
      if (event.target && event.target.tagName == "IMG") {
        let imageViewer = this.imageViewerCtrl.create(event.target);
        imageViewer.present();
      }
    });
    //缩放手势--只有epub3
    // if (this.book.type == "epub3") {
    //   this.gesture.on('pinch', (event) => {
    //     console.log('pinch: ', "zoom:" + event.scale);

    //     var bodyElement = this.epub.renderer.doc.body;
    //     var transform = EPUBJS.core.prefixed('transform');
    //     var transformOrigin = EPUBJS.core.prefixed('transformOrigin');
    //     bodyElement.style.position = "absolute";
    //     bodyElement.style[transform] = "scale(" + Math.max(event.scale, 1) + ")";
    //     bodyElement.style[transformOrigin] = "0% 0%";
    //   });
    // }

  }
  // //显示目录
  showCatalog(event) {
    this.menuCtrl.open();
  }
  initTOC(toc) {
    if (toc.length>0){
      this.hasCatalog=true
    }
    this.events.publish('UPDATE_CATALOG_MENU', toc);
    this.events.subscribe("SELECT_CATALOG_MENU", (eventData) => {
      let chapter = eventData;
      console.log("target CFI: " + JSON.stringify(chapter));
      this.epub.goto(chapter.href);
      this.menuCtrl.close();
    });
  }
  rangeChangeHandler(event) {
    if (event.value != this.currentPage) {
      this.epub.gotoPage(event.value);
    }
  }
  //翻页
  nextPage() {
    if (this.currentPage >= this.epub.pagination.lastPage)
      return;
    this.epub.nextPage();
    //console.log(this.currentPage, this.epub.pagination.lastPage);
  }
  prevPage() {
    if (this.currentPage <= this.epub.pagination.firstPage)
      return;
    this.epub.prevPage();
    console.log(this.currentPage, this.epub.pagination.lastPage,this.epub.pagination);
  }

  //样式设置
  showStylesPopover(event) {
    let popover = this.popoverCtrl.create(StylesPopoverComponent, this.epub);
    popover.present({ ev: event });
  }
}
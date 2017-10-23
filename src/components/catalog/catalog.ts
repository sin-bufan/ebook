import { Events } from 'ionic-angular';
import { Component, Input} from '@angular/core';
//import { Renderer, ElementRef } from '@angular/core';

@Component({
  selector: 'catalog',
  templateUrl: 'catalog.html'
})
export class CatalogComponent {

  @Input('toc') toc: any;
  constructor(
    //public element: ElementRef,
    //public renderer: Renderer,
    private events: Events
  ) {

  }
  openItem(item): void {
    this.events.publish('SELECT_CATALOG_MENU', item);
  }
}

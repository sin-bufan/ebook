import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
/*
  Generated class for the CatalogPopover component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'catalog-popover',
  templateUrl: 'catalog-popover.html'
})
export class CatalogPopoverComponent {

  toc: any;
  constructor(
    public viewCtrl: ViewController,
    params: NavParams
  ) {
    this.toc = params.data;
    console.log(JSON.stringify(params.data));
  }
  openItem(item): void {
    this.viewCtrl.dismiss(item);
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

}

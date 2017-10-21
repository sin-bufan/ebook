import { CatalogComponent } from './../components/catalog/catalog';
import { Component, ViewChild } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class EBook {
  rootPage: any = HomePage;
  @ViewChild("catalog") catalog:CatalogComponent;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      events.subscribe("UPDATE_CATALOG_MENU", (eventData) => {
        //Logic to update Side-menu
        console.info(eventData);
        this.catalog.toc = eventData;
      });
    });
  }

}
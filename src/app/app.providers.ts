import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { BooksData } from '../providers/books-data';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

class StatusBarMock {
    styleDefault() {
        console.log("mock style status bar");
    }
}
class SplashScreenMock {
    hide() {
        console.log("mock hide splash");
    }
}
class ScreenOrientationMock {
    lock(orientation) {
        console.log("mock lock Orientation:",orientation);
    }
    unlock() {
        console.log("mock unlock Orientation");
    }
}
export class AppProviders {
    public static getProviders() {
        let providers;
        if (document.URL.includes('https://') || document.URL.includes('http://')) {
             providers = [
                BooksData,
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: ScreenOrientation, useClass: ScreenOrientationMock },
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ];
        } else {
            providers = [
                BooksData,
                StatusBar,
                SplashScreen,
                ScreenOrientation,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ];
        }
        return providers;
    }
}
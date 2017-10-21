import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

window['isHttp'] = (document.URL.indexOf('http://') != -1 || document.URL.indexOf('https://') != -1) ? true : false;

export class StatusBarMock extends StatusBar{
    styleDefault() {
        console.log("mock style status bar");
    }
}


export class SplashScreenMock extends SplashScreen{
    hide() {
        console.log("mock hide splash");
    }
}


export class ScreenOrientationMock extends ScreenOrientation{
    lock(orientation:string):Promise<any> {
        console.log("mock lock Orientation:", orientation);
        return null;
    }
    unlock() {
        console.log("mock unlock Orientation");
    }
}

export const StatusBarProvider = [
    { provide: StatusBar, useClass: window['isHttp']? StatusBarMock : StatusBar }
];
export const SplashScreenProvider = [
    { provide: SplashScreen, useClass: window['isHttp'] ? SplashScreenMock : SplashScreen }
];
export const ScreenOrientationProvider = [
    { provide: ScreenOrientation, useClass: window['isHttp'] ? ScreenOrientationMock : ScreenOrientation }
];
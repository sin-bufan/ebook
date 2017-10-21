import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";

@Component({
  selector: "styles-popover",
  templateUrl: "styles-popover.html"
})
export class StylesPopoverComponent {

  book: any;
  //字号
  fontSize: number = 1;
  FONT_SIZE_INTERVAL: number = 0.1;
  MIN_FONT_SIZE: number = 0.5;
  MAX_FONT_SIZE: number = 2;
  //背景色
  THEME_COLORS: any = [
    {
      "name": "white",
      "bg": "rgb(255, 255, 255)",
      "text": "rgb(0, 0, 0)"
    },
    {
      "name": "tan",
      "bg": "rgb(249, 241, 228)",
      "text": "rgb(0, 0, 0)"
    },
    {
      "name": "grey",
      "bg": "rgb(76, 75, 80)",
      "text": "rgb(255, 255, 255)"
    },
    {
      "name": "black",
      "bg": "rgb(0, 0, 0)",
      "text": "rgb(255, 255, 255)"
    }
    ]
  constructor(
    public viewCtrl: ViewController,
    params: NavParams
  ) {
    this.book = params.data;
  }
  //防缩字号
  changeFontSize(direction) {
    switch (direction) {
      case "larger":
        if (this.fontSize < this.MAX_FONT_SIZE) {
          this.fontSize = this.fontSize + this.FONT_SIZE_INTERVAL;
        } break;
      case "smaller":
        if (this.fontSize > this.MIN_FONT_SIZE) {
          this.fontSize = this.fontSize - this.FONT_SIZE_INTERVAL;
        }; break;
    }
    console.log("font size:",this.fontSize + "em")
    this.book.setStyle("font-size", this.fontSize + "em");
  }
  changeBackground(item) {
    this.book.setStyle("background-color", item.bg);
    this.book.setStyle("color", item.text);
  }
  //关闭
  close(): void {
    this.viewCtrl.dismiss();
  }

}

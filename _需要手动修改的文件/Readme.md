epubjs
修改移动设备上自动放大bug
node_modules\epubjs\build\epub.js


ion-image-viewer
修改弹出图片框的样式：
node_modules\ionic-img-viewer\dist\es2015\src\image-viewer.component.js(用于调试)
65-66
node_modules\ionic-img-viewer\dist\es2015\src\image-viewer.component.metadata.json(用于发布)
21-22
<!-- 
"template": "<ion-backdrop></ion-backdrop>\n\n\t\t<div class=\"image-wrapper\">\n\t\t\t<div class=\"image\" #imageContainer>\n\t\t\t\t<img [src]=\"imageUrl\" tappable #image />\n\t\t\t</div>\n\t\t</div>\n\t<ion-fab top left><button (click)=\"this._nav.pop()\" ion-fab mini><ion-icon name=\"arrow-back\"></ion-icon></button></ion-fab>",
"styles": ["image-viewer.ion-page { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; height: 100%; opacity: 1; } image-viewer.ion-page ion-navbar.toolbar .toolbar-background { background-color: transparent; } image-viewer.ion-page ion-navbar.toolbar.toolbar-ios { padding-top: calc(20px + 4px); } image-viewer.ion-page ion-navbar .bar-button-default { color: white; } image-viewer.ion-page .backdrop { will-change: opacity; } image-viewer.ion-page .image-wrapper { position: relative; z-index: 10; display: flex; overflow: hidden; flex-direction: column;  margin-top: 0px; flex-grow: 1; justify-content: center; width: 100%; height: 100%; align-items: center;} image-viewer.ion-page .image { will-change: transform; width: 98%; height: 98%;} image-viewer.ion-page img { display: block; max-width: 100%; max-height: 100%; margin: 0 auto; } "],
-->
          
        
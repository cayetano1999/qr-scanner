import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private stb: StatusBar) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.stb.show();
      // let status bar overlay webview
      this.stb.overlaysWebView(true);

      // set status bar to white
      // this.stb.backgroundColorByHexString('#ffffff');
    });
  }
}
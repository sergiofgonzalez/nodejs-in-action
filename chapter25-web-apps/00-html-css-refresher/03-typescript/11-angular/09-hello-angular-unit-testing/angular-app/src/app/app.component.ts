import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BroadcastService, EventKeys } from './services/broadcast.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app';

  @ViewChild('sidenav') sidenav: MatSidenav | null = null;

  constructor(broadcastService: BroadcastService) {
    _.bindAll(this, 'onLoginClicked');
    broadcastService.on(EventKeys.LOGIN_BUTTON_CLICKED)
      .subscribe(this.onLoginClicked);
  }

  onLoginClicked(event: string) {
    console.log(`AppComponent received: ${ event }`);
    this.sidenav?.open();
  }
}

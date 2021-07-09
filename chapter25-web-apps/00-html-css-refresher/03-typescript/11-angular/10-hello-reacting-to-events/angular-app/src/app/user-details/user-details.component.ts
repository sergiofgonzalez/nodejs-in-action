import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import { BroadcastService, EventKeys } from '../services/broadcast.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  loggedInUsername = 'logged_in_user';
  isLoggedIn: boolean = false;
  @Output() notify = new EventEmitter();

  constructor(private broadcastService: BroadcastService) {
    _.bindAll(this, 'loginSuccessful');
    this.broadcastService.on(EventKeys.USER_LOGIN_EVENT)
      .subscribe(this.loginSuccessful);
  }

  ngOnInit(): void {
  }

  onLoginClicked() {
    console.log(`UserDetailsComponent: onLoginClicked()`);
    this.notify.emit('UserDetailsComponent: emit value');

    this.broadcastService.broadcast(
      EventKeys.LOGIN_BUTTON_CLICKED,
      'UserDetailsComponent: LOGIN_BUTTON_CLICKED'
    );
  }

  loginSuccessful(event: any): void {
    console.log(`UserDetailsComponent: loginSuccessful(): ${ event }`);
    this.isLoggedIn = true;
  }

  onLogoutClicked(): void {
    this.loggedInUsername = '';
    this.isLoggedIn = false;
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  loggedInUsername = 'logged_in_user';
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onLoginClicked() {
    console.log(`UserDetailsComponent: onLoginClicked()`);
    this.notify.emit('UserDetailsComponent: emit value');
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notif-register',
  templateUrl: './notif-register.component.html',
  styleUrls: ['./notif-register.component.scss'],
})
export class NotifRegisterComponent implements OnInit {
  public _message: string;
  @Input('message')
  set message(m) {
    this._message = m;
  }
  constructor() {}

  ngOnInit() {}
}

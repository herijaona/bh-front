import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../../globals/globals';

@Component({
  selector: 'app-deal-application',
  templateUrl: './deal-application.component.html',
  styleUrls: ['./deal-application.component.scss'],
})
export class DealApplicationComponent implements OnInit {
  constructor(public g: Globals) {}

  ngOnInit() {}
}

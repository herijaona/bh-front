import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../../globals/globals';

@Component({
  selector: 'app-one-deal-space',
  templateUrl: './one-deal-space.component.html',
  styleUrls: ['./one-deal-space.component.scss'],
})
export class OneDealSpaceComponent implements OnInit {
  public img_avatar: string;
  constructor(public g: Globals) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }
  ngOnInit() {}
}

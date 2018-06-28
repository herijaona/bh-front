import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals/globals';
@Component({
  selector: 'app-community-space',
  templateUrl: './community-space.component.html',
  styleUrls: ['./community-space.component.scss'],
})
export class CommunitySpaceComponent implements OnInit {
  public img_avatar: string;
  constructor(public g: Globals) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }

  ngOnInit() {}
}

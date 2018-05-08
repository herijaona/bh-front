import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
@Component({
  selector: 'app-members-admin',
  templateUrl: './members-admin.component.html',
  styleUrls: ['./members-admin.component.scss']
})
export class MembersAdminComponent implements OnInit {

  public img_avatar: string;
  constructor(public g: Globals) {
    this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
   }

  ngOnInit() {
  }

}

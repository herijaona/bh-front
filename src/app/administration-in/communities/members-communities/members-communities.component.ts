import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './../../../globals/globals';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';

@Component({
  selector: 'app-members-communities',
  templateUrl: './members-communities.component.html',
  styleUrls: ['./members-communities.component.scss'],
})
export class MembersCommunitiesComponent implements OnInit {
  public communityShow = false;
  public userCommData: any;
  public img_avatar = '';
  public messageUser = '';
  public anyUser = false;
  constructor(public g: Globals, private router: Router, private auth: AuthserviceService, private tms: TeamsService) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }

  async ngOnInit() {
    try {
      let isAdmin = await this.auth.isAdminUser();
      if (isAdmin.status === 'OK') {
        this.getCommunity();
      } else {
        this.router.navigateByUrl('/');
      }
    } catch (e) {}
  }

  async getCommunity() {
    try {
      let cUser: any = await this.tms.getCommunityData();
      if (cUser) {
        if (cUser.status === 'OK') {
          this.userCommData = cUser.data.users;
          console.log(this.userCommData);
          this.communityShow = true;
        } else {
          this.messageUser = cUser.message;
          this.anyUser = true;
        }
      }
    } catch (e) {}
  }

  getDateString(dt) {
    return new Date(dt).toDateString();
  }
}

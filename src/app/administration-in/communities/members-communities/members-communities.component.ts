import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './../../../globals/globals';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-members-communities',
  templateUrl: './members-communities.component.html',
  styleUrls: ['./members-communities.component.scss'],
})
export class MembersCommunitiesComponent implements OnInit {
  public st: any;
  public communityShow = false;
  public userCommData: any;
  public img_avatar = '';
  public messageUser = '';
  public anyUser = false;
  constructor(public g: Globals, private router: Router, private auth: AuthserviceService, private tms: TeamsService) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }
  @ViewChild('modalSet') public myModalHist: ModalDirective;
  public showModal() {
    setTimeout(() => {
      this.myModalHist.show();
    }, 330);
  }
  public hideModal() {
    setTimeout(() => {
      this.myModalHist.hide();
    }, 330);
  }

  async ngOnInit() {
    try {
      const isAdmin = await this.auth.isAdminUser();
      if (isAdmin['status'] === 'OK') {
        this.getCommunity();
      } else {
        this.router.navigateByUrl('/');
      }
    } catch (e) {}
  }

  async getCommunity() {
    try {
      const cUser: any = await this.tms.getCommunityData();
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


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '../../services/teams/teams.service';
import { SharedNotificationService } from '../../services/shared-notification/shared-notification.service';
import { Globals } from './../../globals/globals';

@Component({
  selector: 'app-reply-org-invitation',
  templateUrl: './reply-org-invitation.component.html',
  styleUrls: ['./reply-org-invitation.component.scss'],
})
export class ReplyOrgInvitationComponent implements OnInit {
  public img_logo: string;
  public invitationID = '';
  public errorData = '';
  public hasError = false;
  constructor(
    private activRoute: ActivatedRoute,
    private router: Router,
    private tms: TeamsService,
    private sh: SharedNotificationService,
    public g: Globals
  ) {
    this.img_logo = this.g.base_href + 'assets/img/logo-cca.png';
    this.activRoute.params.subscribe((params_: any) => {
      this.invitationID = params_['id_invitation'];
      if (!this.invitationID) {
        this.router.navigateByUrl('/error-notification');
      }
    });
  }

  async ngOnInit() {
    try {
      const rec_check = await this.tms.checkInvitationState({ invitID: this.invitationID });
      if (rec_check['status'] === 'OK') {
        this.router.navigateByUrl('/register-organisation/byInvitation/' + this.invitationID);
      } else {
        this.hasError = true;
        this.errorData = rec_check['message'];
      }
    } catch (e) {
      console.log(e);
      this.router.navigateByUrl('/error-notification');
    }
  }
}

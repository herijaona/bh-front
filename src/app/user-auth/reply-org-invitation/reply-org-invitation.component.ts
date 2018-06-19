import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reply-org-invitation',
  templateUrl: './reply-org-invitation.component.html',
  styleUrls: ['./reply-org-invitation.component.scss']
})
export class ReplyOrgInvitationComponent implements OnInit {
  public invitationID = '';
  constructor(private activRoute: ActivatedRoute, private router: Router) {
    this.activRoute.params.subscribe((params_: any) => {
      this.invitationID = params_['id_invitation'];
      if (!this.invitationID) {
        this.router.navigateByUrl('/error-notification');
      }
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Globals } from "../../../globals/globals";
import { SharedNotificationService } from "../../../services/shared-notification/shared-notification.service";
import { AuthserviceService } from "../../../services/authservice/authservice.service";
import { TeamsService } from "../../../services/teams/teams.service";

@Component({
  selector: "app-invited-organisation",
  templateUrl: "./invited-organisation.component.html",
  styleUrls: ["./invited-organisation.component.scss"]
})
export class InvitedOrganisationComponent implements OnInit {
  public inviteForm: FormGroup;
  public itemrow: any;

  constructor(private _fb: FormBuilder, private tms: TeamsService) {}

  ngOnInit() {
    this.inviteForm = this._fb.group({
      inviteItem: this._fb.array([this.initItemRows()])
    });
  }

  initItemRows() {
    return this._fb.group({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      organisationName: new FormControl("", [Validators.required]),
      bhEmail: new FormControl("", [
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        Validators.required
      ])
    });
  }

  addNewRow() {
    const control = <FormArray>this.inviteForm.controls["inviteItem"];
    control.push(this.initItemRows());
  }
  deleteRow(index: number) {
    const control = <FormArray>this.inviteForm.controls["inviteItem"];
    control.removeAt(index);
  }
  getcontrols() {
    return this.inviteForm.controls.inviteItem["controls"];
  }

  async sendInvitation() {
    if (!this.inviteForm.valid) {
      return;
    }
    let argDATA = {
      org_data: this.inviteForm.value.inviteItem
    };
    try {
      let invitRes = await this.tms.sendOrgnisationInvitation(argDATA);
      if (invitRes["status"] == "OK") {
        console.log("OK");
      }
    } catch (e) {
      console.log(e);
    }
  }
}

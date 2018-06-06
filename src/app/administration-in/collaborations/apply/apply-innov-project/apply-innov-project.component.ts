import { Component, OnInit, Input } from "@angular/core";
import { IMyDpOptions } from "mydatepicker";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../../services/projects/projects.service";
import { SharedNotificationService } from "./../../../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../../../globals/globals";

@Component({
  selector: "apply-innov-project",
  templateUrl: "./apply-innov-project.component.html",
  styleUrls: ["./apply-innov-project.component.scss"]
})
export class ApplyInnovProjectComponent implements OnInit {
  public prObjApply: any;
  public UserOrgName: any;
  public canBeSent: boolean = false;
  public modelCountry: string = "default";
  public modelDate: any = {
    date: {
      year: new Date(Date.now()).getFullYear(),
      month: new Date(Date.now()).getMonth() + 1,
      day: new Date(Date.now()).getDate()
    }
  };
  public ListCo: any = [];
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: "dd-mm-yyyy",
    editableDateField: false,
    componentDisabled: true,
    showClearDateBtn: false,
    showTodayBtn: false
  };
  @Input("data_in")
  set data_in(o) {
    this.prObjApply = o;
  }

  public projectApplyData = {
    main_activity_domain: "",
    secondary_activity_domain: "",
    skill_specificities: "",
    user_application_describ: "",
    collab_proposal_describ: ""
  };
  constructor(
    public g: Globals,
    private router: Router,
    private pr: ProjectsService,
    private sh: SharedNotificationService
  ) {}

  ngOnInit() {
    console.log(this.prObjApply);
    if (this.prObjApply["hasAcc"]) {
      /* the default */
      this.UserOrgName = this.prObjApply["userACC"][0].enseigneCommerciale;
    } else {
      this.UserOrgName = this.prObjApply["userACC"]["enseigneCommerciale"];
    }
    this.getCountryList();
  }

  async getCountryList() {
    try {
      let cListres = await this.pr.countryGet('all');
      if (cListres["status"] == "OK") {
        this.ListCo = cListres["data"];
        console.log(this.ListCo);
      }
    } catch (e) {}
  }

  applicationDescription(event, modelData) {
    let s = event.target.value.replace(/\r?\n/g, "<br>");
    console.log(s);
  }

  onDateChanged(event) {
    console.log(event);
  }

  onChangeEditor(ev) {
    let canSent = true;
    for (let el of Object.keys(this.projectApplyData)) {
      if (this.projectApplyData[el].length == 0) {
        canSent = false;
        break;
      }
    }
    let countryModel = true;
    if (this.modelCountry == "default") countryModel = false;

    this.canBeSent = canSent && countryModel;
  }

  async sendApplicationOnProject() {
    if (this.canBeSent) {
      for (let el of Object.keys(this.projectApplyData)) {
        this.projectApplyData[el] = this.projectApplyData[el].replace(
          /\r?\n/g,
          "<br>"
        );
      }

      let arg = {
        data: this.projectApplyData,
        currObj: this.projectApplyData,
        countryCD: this.modelCountry
      };
      try {
        let ret: any = await this.pr.sendProjectsApplication(arg);

        if (ret.status == "OK") {
          this.sh.notifToast({
            type: "success",
            message: "<p>Application sent</p>"
          });
          setTimeout(() => {
            this.router.navigateByUrl(
              "/" +
                ["administration-in", "collaborations", "apply-sent"].join("/")
            );
          }, 500);
        }
      } catch (e) {}
    }
  }
}

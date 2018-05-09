import { Component, OnInit, ViewChild } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyService } from "../../services/company/company.service";
import { Subscription } from "rxjs/Subscription";
import { ModalDirective } from "angular-bootstrap-md";
import { TeamsService } from "../../services/teams/teams.service";

@Component({
  selector: "team-content",
  templateUrl: "./team-content.component.html",
  styleUrls: ["./team-content.component.scss"]
})
export class TeamContentComponent implements OnInit {
  public currentCompanySlug: string;
  public editPAGEstatus: boolean = false;
  public contentEditState: boolean = false;
  public addNewState: boolean = false;
  @ViewChild("form") myModal: ModalDirective;
  public dataTeamFront: any = [];
  public tmVideoAction: string;
  private editAct = "tmVEdit";
  private AddAct = "tmVAdd";
  public tmVideoData : any ;

  constructor(
    public g: Globals,
    public sh: SharedNotificationService,
    private activRoute: ActivatedRoute,
    private cs: CompanyService,
    private tms: TeamsService,
    private router: Router
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_["slug_acc"];
      this.getDataTeamFront(this.currentCompanySlug);
    });

    this.sh.notifButton$.subscribe((st: any) => {
      if (st.no == "clck") {
        if (!st.state) {
          this.editPAGEstatus = false;
          this.contentEditState = false;
        } else {
          this.editPAGEstatus = true;
        }
      }
    });

    this.sh.busDataIn$.subscribe((st: any) => {
      switch (st.from) {
        case "tmodal_new":
          if (st.data == "end") {
            this.closeModalAddNEw();
          }
          break;
        case "tmVideoFront":
          if (st.action == "refresh") {
                this.getDataTeamFront(this.currentCompanySlug);            
          } else if(st.action == "edit"){
                this.editTmVideo(st.data);
          }
          break;
        default:
          // code...
          break;
      }
    });
  }

  ngOnInit() {}

  AddNew() {
    this.addNewState = true;
     this.tmVideoAction = this.AddAct;
    this.tmVideoData = null;
    this.myModal.show();
  }
  editTmVideo(data) {
    this.addNewState = true;
    this.tmVideoAction = this.editAct;
    this.tmVideoData = data;
    this.myModal.show();
  }

  async getDataTeamFront(sl_) {
    try {
      let allData = await this.tms.teamFrontGetData(this.currentCompanySlug);
      if (allData) {
        if (allData["status"] == 200) {
          this.dataTeamFront = allData["videoTeam"];
        }
      }
    } catch (e) {}
  }

  closeModalAddNEw() {
    this.myModal.hide();
    setTimeout(() => {
      this.addNewState = false;
    }, 330);
  }
}

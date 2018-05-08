import { Component, OnInit ,ViewChild } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyService } from "../../services/company/company.service";
import { Subscription } from "rxjs/Subscription";
import { ModalDirective } from "angular-bootstrap-md";

@Component({
  selector: "team-content",
  templateUrl: "./team-content.component.html",
  styleUrls: ["./team-content.component.scss"]
})
export class TeamContentComponent implements OnInit {
  public currentCompanySlug : string;
  public editPAGEstatus: boolean = false;
  public contentEditState: boolean = false;
  public addNewState: boolean = false;
  @ViewChild("form") myModal: ModalDirective;

  constructor(
    public g: Globals,
    public sh: SharedNotificationService,
    private activRoute: ActivatedRoute,
    private cs: CompanyService,
    private router: Router
  ) {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_["slug_acc"];
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
  }

  ngOnInit() {}

  AddNew(){
    this.addNewState = true;
    this.myModal.show();
  }
  
  closeModalAddNEw() {
    this.myModal.hide();
    setTimeout(() => {
      this.addNewState = false;
    }, 330);
  }
}

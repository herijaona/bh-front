import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { CompanyService } from "../../services/company/company.service";
import { UserDetails } from "../../models/user-detail.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from "angular-bootstrap-md";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";

// import { resolve } from "dns";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  public details: UserDetails;
  public mindset_page: string = "mindset_page";
  public EditForm: FormGroup;
  public editPInfo: boolean = false;
  public editCompInfo: boolean = false;
  public editPassword: FormGroup;
  public showInfo: boolean = false;
  public isAdmin: boolean = false;
  public validUser: boolean = false;
  public accountData: any;
  public uform: FormGroup;
  public userSettings: any = {
    showSearchButton: false,
    showRecentSearch: false,
    geoTypes: ["(cities)"],
    showCurrentLocation: false,
    inputPlaceholderText: "Adresse: Ville, Pays ......"
  };

  private orgAddr: string = "";
  private localAdded: boolean = false;

  constructor(
    private el: ElementRef,
    private auth: AuthserviceService,
    private cs: CompanyService,
    public sh: SharedNotificationService,
    private route: Router,
    public g: Globals
  ) {
    this.details = new UserDetails();
    this.EditForm = new FormGroup({
      bh_lastname: new FormControl("", [Validators.required]),
      bh_firstname: new FormControl("", [Validators.required]),
      bh_email: new FormControl("", [
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      bh_functions: new FormControl("", [Validators.required])
    });

    this.editPassword = new FormGroup({
      bh_pass: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      bh_passConf: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ])
    });

    this.uform = new FormGroup({
      _acc_commercial: new FormControl(""),
      _acc_socialMean: new FormControl(""),
      _acc_websitLink: new FormControl(""),
      _orgType: new FormControl("")
    });
  }

  async ngOnInit() {
   

    try {
      let resp = await this.getProfile();
      if (resp) {
        if (!this.details.active) {
          this.auth.removeUserItem();
          this.showInfo = true;
        } else {
          this.EditForm.setValue({
            bh_lastname: this.details.lastname,
            bh_firstname: this.details.firstname,
            bh_functions: this.details.function,
            bh_email: this.details.email
          });
          this.validUser = true;

          let accData: any = await this.auth.isAdminUser();
          if (accData.status == "OK") {
            this.accountData = accData.data;
         
            let urlWebsite =
              "websiteUrl" in this.accountData
                ? this.accountData.websiteUrl
                : "";
            this.uform.setValue({
              _acc_commercial: this.accountData.enseigneCommerciale,
              _acc_socialMean: this.accountData.raisonSociale,
              _acc_websitLink: urlWebsite,
              _orgType: this.accountData.typeOrganisation
            });

            this.isAdmin = true;
            let addr: any = JSON.parse(this.accountData.adresse);
            let addrAcc = addr.description;
            this.userSettings["inputString"] = addrAcc;
            this.userSettings = Object.assign({}, this.userSettings);
          }
        }
      }
    } catch (er) {
      console.log(er);
    }
  }

  async getProfile() {
    try {
      let prdata = await this.auth.profile();
      if (prdata) {
        this.details = prdata;
        return prdata;
      }
    } catch (ee) {
      this.auth.logout();
    }
  }

  async EditProfile() {
    let credential = {
      lastname: this.EditForm.value.bh_lastname,
      firstname: this.EditForm.value.bh_firstname,
      email: this.EditForm.value.bh_email,
      function: this.EditForm.value.bh_functions
    };
    try {
      let r: any = await this.sendDataEdit(credential);
      if (r == "DONE") {
        this.editPInfo = false;
      }
    } catch (e) {}
  }

  async sendDataEdit(arg) {
    try {
      let resp: any = await this.auth.editprofile(arg);
      if (resp) {
        if (resp.status == "OK") {
          this.saveUser(resp.data);
          this.successAction();
          return "DONE";
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  saveUser(user: any) {
    var d = this.auth.copydata(this.details, user);
    this.details = d;
    this.auth.saveUser(this.details);
  }

  EditPassword() {
    let credential = {
      password: this.editPassword.value.bh_pass
    };
    this.auth.editpass(credential).subscribe(user => {
      this.successAction();
      this.editPassword.reset();
    });
  }

  successAction() {
    this.sh.notifToast({
      type: "success",
      message: "<p>Mis a jour Reussi</p>"
    });
  }

  activeInfoEdit() {
    this.editPInfo = true;
  }

  autoCompleteCallback1(selectedData: any) {
    if (selectedData.response) {
      this.orgAddr = JSON.stringify(selectedData.data);
      this.localAdded = true;
    } else {
      this.orgAddr = "";
      this.localAdded = false;
    }
  }

  /* Handle Company Update Data Info*/
  onUpdateFormSubmit() {
    var cr: { [key: string]: any } = {
      raisonSociale: this.uform.value._acc_socialMean,
      enseigneCommerciale: this.uform.value._acc_commercial,
      websiteUrl: this.uform.value._acc_websitLink,
      typeOrganisation: this.uform.value._orgType
    };

    if (this.localAdded) {
      cr["adresse"] = this.orgAddr;
    }

    this.cs.updateDataInfo(cr).then(
      (resp: any) => {
        this.cs.setDataC(resp);
        this.sh.notifToast({
          type: "success",
          message: "<p>Mis a jour Reussi</p>"
        });
        this.sh.pushData({ from: "editData", action: "refresh" });
      },
      err => {
        console.log(err.error);
      }
    );
  }

  activeCmpInfoEdit() {
    this.editCompInfo = !this.editCompInfo;
  }

  ngOnDestroy() {
    this.sh.pushData({});
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { Router } from "@angular/router";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";

import { Globals } from "./../../globals/globals";
@Component({
  selector: "login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"]
})
export class LoginModalComponent implements OnInit {
  public currObj: any;
  @Input("data_")
  set data_(d) {
    this.currObj = d;
  }
  public img_logo: string;
  public img_avatar: string;
  public alrt_type: string;
  public msg_error: string = "";
  public loginForm: FormGroup;
  public resetpassForm: FormGroup;
  @Output() endMessage = new EventEmitter<{}>();
  public notifReset: boolean = false;
  public hasError: boolean = false;
  public loginFormFlag: boolean = true;
  type_ = "notif";
  text_ = "Success de registration";
  error_log: boolean = false;

  constructor(
    public g: Globals,
    private auth: AuthserviceService,
    private router: Router,
    private sh: SharedNotificationService
  ) {
    this.img_avatar = this.g.base_href + "assets/img/bg-accueil.jpg";
    this.img_logo = this.g.base_href + "assets/img/bh.png";
  }
  ngOnInit() {
    console.log(this.currObj.data);
    this.resetpassForm = new FormGroup({
      bhemail: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ])
    });

    this.loginForm = new FormGroup({
      bhemail: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      bh_pass: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }
  async onFormSubmit() {
    let credential = {
      email: this.loginForm.value.bhemail,
      password: this.loginForm.value.bh_pass
    };

    try {
      let logRes = await this.auth.login(credential);
      if (logRes) {
        let pr = this.auth.profile();
        if (pr) {
          this.sh.pushData({
            from: "updateDataLogged",
            message: "update view",
            data: pr
          });
          let aft: any = null;
          let aft_data: any = null;
          if ("after" in this.currObj.data) {
            aft = this.currObj.data.to;
            aft_data = this.currObj.data.after;
          }
          this.endAll({ status: "OK", after: aft, data: aft_data });
          console.log(pr);
        }
      }
    } catch (e) {
      console.log(e);
      this.hasError = true;
      this.alrt_type = "warning";
      this.msg_error =
        "Error type: " + e.error_type + ". Message: " + e.message;
    }
  }

  forgotPasswordInit(e) {
    e.preventDefault();
    if (this.loginFormFlag) {
      this.loginFormFlag = false;
      this.loginForm.reset();
    } else {
      this.loginFormFlag = true;
      this.resetpassForm.reset();
    }
    this.error_log = false;
  }

  resetFormSubmit() {
    var afterSubmit = new Promise((resolve, reject) => {
      this.auth
        .requestresetpass({ email: this.resetpassForm.value.bhemail })
        .toPromise()
        .then(
          (res: any) => {
            setTimeout(() => {
              if (res.status == "OK") {
                this.type_ = "success";
                this.text_ =
                  "Demande de reinitialisation de mot passe effectuer avec success <br>" +
                  res.message +
                  " <br> Veuiller consulter votre email .";
              } else {
                this.type_ = "warning";
                this.text_ =
                  "Un erreur est survenue au cours de votre demande<br>" +
                  res.message +
                  " <br> Merci.";
              }
              this.resetpassForm.reset();
              this.error_log = true;
            }, 1000);
          },
          error => {
            this.type_ = "warning";
            this.text_ =
              "Un erreur est survenue au cours de votre demande<br>" +
              error.error.text +
              " <br> Merci.";
            this.resetpassForm.reset();
            this.error_log = true;
          }
        );
    });
  }
  endAll(status) {
    this.endMessage.emit(status);
  }
}

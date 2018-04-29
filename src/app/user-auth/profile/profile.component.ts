import {
  ElementRef,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { UserDetails } from "../../models/user-detail.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";

// import { resolve } from "dns";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  public img_avatar: string;
  EditForm: FormGroup;
  editPassword: FormGroup;
  showInfo: boolean = false;
  validUser: boolean = false;

  constructor(
    private el: ElementRef,
    private auth: AuthserviceService,
    public sh: SharedNotificationService,
    private route: Router,
    public g: Globals
  ) {
    this.img_avatar = this.g.base_href + "assets/img/profile-placeholder.jpg";
    this.details = new UserDetails();
    this.EditForm = new FormGroup({
      bh_lastname: new FormControl("", [Validators.required]),
      bh_firstname: new FormControl("", [Validators.required]),
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
  }
  ngOnInit() {
    this.getProfile()
      .then(() => {
        if (!this.details.active) {
          this.auth.removeUserItem();
          let profile_data: HTMLInputElement = this.el.nativeElement.querySelector(
            "#pr_data"
          );
          this.showInfo = true;
        } else {
          this.EditForm.setValue({
            bh_lastname: this.details.lastname,
            bh_firstname: this.details.firstname,
            bh_functions: this.details.function
          });
          this.validUser = true;
        }
      })
      .then(() => {
        console.log("Before sending Notification");
        this.sh.loadViewData({ sc: 0 });
      });
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      var savedUser: any = this.auth.getUser();
      if (savedUser) {
        this.details = savedUser;
        resolve();
      } else {
        this.auth.profile().then(
          user => {
            this.details = this.auth.getUser();
            resolve();
          },
          err => {
            this.auth.logout();
          }
        );
      }
    });
  }

  EditProfile() {
    let credential = {
      lastname: this.EditForm.value.bh_lastname,
      firstname: this.EditForm.value.bh_firstname,
      function: this.EditForm.value.bh_functions
    };
    this.auth.editprofile(credential).subscribe(
      (details: any) => {
        this.saveUser(details);
        // this.details = user;
        this.successAction();
      },
      err => {}
    );
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
}

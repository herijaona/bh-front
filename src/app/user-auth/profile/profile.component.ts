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
// import { resolve } from "dns";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  details: UserDetails;

  private EditForm: FormGroup;
  private editPassword: FormGroup;

  constructor(private auth: AuthserviceService, private route: Router) {
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
    this.getProfile().then(() => {
      this.EditForm.setValue({
        bh_lastname: this.details.lastname,
        bh_firstname: this.details.firstname,
        bh_functions: this.details.function
      });
    });
  }
  getProfile() {
    return new Promise((resolve, reject) => {
      this.auth
        .profile()
        .toPromise()
        .then(
          user => {
            this.details = this.copydata(this.details, user);
            resolve();
          },
          err => {
          }
        );
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
      },
      err => {
      }
    );
  }
  copydata(user: UserDetails, data: any) {
    Object.keys(data).forEach(function(key) {
      if (key in user) {
        user[key] = data[key];
      }
    });
    return user;
  }
  saveUser(user: any) {
    var d = this.copydata(this.details, user);
    this.details = d;
    this.auth.saveUser(this.details);
  }

  EditPassword() {
    let credential = {
      password: this.editPassword.value.bh_pass
    };
    this.auth.editpass(credential).subscribe(user => {
    });
  }
}

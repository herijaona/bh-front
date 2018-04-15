import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  type_ = 'notif';
  text_ = 'Success de registration';
   error_log :boolean = false;
constructor(private auth: AuthserviceService, private router: Router) { }
  ngOnInit() {
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
  onFormSubmit() {
		let credential = {
			email: this.loginForm.value.bhemail,
			password: this.loginForm.value.bh_pass
    };
    this.auth.login(credential).subscribe((data:any) => {
      this.router.navigateByUrl("/profile");
    },
    error => {
      this.error_log = true;
      this.text_ = 'Username ou Password erronee';
      this.type_ = 'error';
    }
  );
}
  
}

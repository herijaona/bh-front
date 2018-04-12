import {
	ElementRef,
	ViewChild,
	ComponentFactoryResolver,
	ViewContainerRef
} from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { AuthserviceService} from "../../services/authservice/authservice.service";
import { UserDetails} from "../../models/user-detail.model";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  details: UserDetails;

  private EditForm: FormGroup;
  constructor(private auth:AuthserviceService,private route:Router) { 
    this.details = new UserDetails();
  }
  ngOnInit() {
    this.getProfile();

    this.EditForm = new FormGroup({
			bh_lastname: new FormControl("", [Validators.required])
		});
  }
  getProfile(){
    this.auth.profile().subscribe(user => {
      console.log(user);
      this.details = this.copydata(this.details,user);
      console.log('--1-----');  
      console.log(this.details);
      console.log('---2----');
    }, (err) => {
      console.error(err);
    });
  }
  EditProfile(){
    let credential = {
			lastname: this.EditForm.value.bh_lastname
		};
    this.auth.editprofile(credential).subscribe((details: any) => {
       console.log(details);
       this.saveUser(details);
      // this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
  copydata(user: UserDetails, data: any){
    console.log('---3----');
    Object.keys(data).forEach(function(key) {
      if (key in user) { 
        user[key] = data[key];
      }       
  });
    return user;
}
  saveUser(user: any){
    var d = this.copydata(this.details,user);
    this.details = d;
    this.auth.saveUser(this.details);
  }

}




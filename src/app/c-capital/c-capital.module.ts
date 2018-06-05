import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project1Component } from './project1/project1.component';
import { NavbarCapitalComponent } from './navbar-capital/navbar-capital.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { RequestInfoComponent } from './request-info/request-info.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NotifComponentUser } from "./notif/notif.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  declarations: [Project1Component, NavbarCapitalComponent, CreateAccountFormComponent, RequestInfoComponent, ProjectDescriptionComponent, NotifComponentUser],
  exports: [NavbarCapitalComponent]
})
export class CCapitalModule { }

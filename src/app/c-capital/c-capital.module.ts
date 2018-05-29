import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project1Component } from './project1/project1.component';
import { NavbarCapitalComponent } from './navbar-capital/navbar-capital.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { RequestInfoComponent } from './request-info/request-info.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Project1Component, NavbarCapitalComponent, CreateAccountFormComponent, RequestInfoComponent, ProjectDescriptionComponent],
  exports: [NavbarCapitalComponent]
})
export class CCapitalModule { }

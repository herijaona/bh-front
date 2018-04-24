import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { ProfileCompaniesComponent } from './profile-companies/profile-companies.component';
import { GeneralComponent } from './utilprofile/general/general.component';
import { OwnUserComponent } from './utilprofile/own-user/own-user.component';
import { ProjetProfileComponent } from './utilprofile/projet-profile/projet-profile.component';
import { JobOnCompProfileComponent } from './utilprofile/job-on-comp-profile/job-on-comp-profile.component';
import { EventOnCompProfileComponent } from './utilprofile/event-on-comp-profile/event-on-comp-profile.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    FormsModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  declarations: [ListCompaniesComponent, ProfileCompaniesComponent, GeneralComponent, OwnUserComponent, ProjetProfileComponent, JobOnCompProfileComponent, EventOnCompProfileComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CompaniesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

/*service*/
import { AuthserviceService } from "../services/authservice/authservice.service";

/* Component Imports*/
import { RegistrationComponent } from './registration/registration.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { ActivationComponent } from './activation/activation.component';
import { LoginComponent } from './login/login.component';
import { NotifComponent } from './notif/notif.component';
import { ProfileComponent } from './profile/profile.component';

import { Routes, RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    RouterModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  entryComponents: [LoginComponent, NotifComponent],
  declarations: [RegistrationComponent, NewCompanyComponent, ActivationComponent, LoginComponent, NotifComponent, ProfileComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthserviceService],
})
export class UserAuthModule { }

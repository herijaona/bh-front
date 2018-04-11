import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
/*service*/
import { AuthserviceService } from "../services/authservice/authservice.service";

/* Component Imports*/
import { RegistrationComponent } from './registration/registration.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { ActivationComponent } from './activation/activation.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule
  ],
  declarations: [RegistrationComponent, NewCompanyComponent, ActivationComponent, LoginComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthserviceService],
})
export class UserAuthModule { }

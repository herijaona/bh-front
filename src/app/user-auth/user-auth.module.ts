import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Ng4GeoautocompleteModule } from "ng4-geoautocomplete";

/*service*/
import { AuthserviceService } from "../services/authservice/authservice.service";

/* Component Imports*/
import { RegistrationComponent } from "./registration/registration.component";
import { NewCompanyComponent } from "./new-company/new-company.component";
import { ActivationComponent } from "./activation/activation.component";
import { LoginComponent } from "./login/login.component";
import { NotifComponent } from "./notif/notif.component";
import { ProfileComponent } from "./profile/profile.component";

import { Routes, RouterModule } from "@angular/router";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { PInfoComponent } from './p-info/p-info.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
   GeneralUtilitiesModule,FormsModule,
    MDBBootstrapModule,
    RouterModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  entryComponents: [LoginComponent, NotifComponent],
  declarations: [
    RegistrationComponent,
    NewCompanyComponent,
    ActivationComponent,
    LoginComponent,
    NotifComponent,
    ProfileComponent,
    ResetPasswordComponent,
    PInfoComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthserviceService]
})
export class UserAuthModule {}

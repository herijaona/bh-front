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
import { NotifComponent } from "./notif/notif.component";
import { ProfileComponent } from "./profile/profile.component";

import { Routes, RouterModule } from "@angular/router";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { PInfoComponent } from './p-info/p-info.component';
import { PCompletionComponent } from './p-completion/p-completion.component';
import { InvitedRegisterComponent } from './invited-register/invited-register.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
   GeneralUtilitiesModule,FormsModule,
    MDBBootstrapModule,
    RouterModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  entryComponents: [PageLoginComponent, NotifComponent],
  declarations: [
    RegistrationComponent,
    NewCompanyComponent,
    ActivationComponent,
    PageLoginComponent,
    NotifComponent,
    ProfileComponent,
    ResetPasswordComponent,
    PInfoComponent,
    PCompletionComponent,
    InvitedRegisterComponent,
    SignUpComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthserviceService], 
  exports:[ PInfoComponent,PCompletionComponent, PageLoginComponent]
})
export class UserAuthModule {}

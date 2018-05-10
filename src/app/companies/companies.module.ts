import { NgModule, NO_ERRORS_SCHEMA  } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { ListCompaniesComponent } from "./list-companies/list-companies.component";
import { ProfileCompaniesComponent } from "./profile-companies/profile-companies.component";
import { GeneralComponent } from "./utilprofile/general/general.component";
import { OwnUserComponent } from "./utilprofile/own-user/own-user.component";
import { ProjetProfileComponent } from "./utilprofile/projet-profile/projet-profile.component";
import { QuillEditorModule } from "ngx-quill-editor";
import { JobOnCompProfileComponent } from "./utilprofile/job-on-comp-profile/job-on-comp-profile.component";
import { EventOnCompProfileComponent } from "./utilprofile/event-on-comp-profile/event-on-comp-profile.component";
import { Ng4GeoautocompleteModule } from "ng4-geoautocomplete";
import { AdminZoneComponent } from "./utilprofile/admin-zone/admin-zone.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    QuillEditorModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  declarations: [
    ListCompaniesComponent,
    ProfileCompaniesComponent,
    GeneralComponent,
    OwnUserComponent,
    ProjetProfileComponent,
    JobOnCompProfileComponent,
    EventOnCompProfileComponent,
    AdminZoneComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports:[ListCompaniesComponent]
})
export class CompaniesModule {}

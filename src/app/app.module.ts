import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
/* Routes */
import { OwnRouterModule } from "./routers/own-router.module";
/* Services */
import { ApiHttpService } from "./services/api-http/api-http.service";
import { AuthguardService } from "./services/authguard/authguard.service";
import { Globals } from "./globals/globals";
import { SharedNotificationService } from "./services/shared-notification/shared-notification.service";

/*Modules impot*/
import { UserAuthModule } from "./user-auth/user-auth.module";
import { DescriptionProjectModule } from "./description-project/description-project.module";
import { HomepageModule } from "./homepage/homepage.module";
import { IdeasModule } from "./ideas/ideas.module";
import { MindsetModule } from "./mindset/mindset.module";
import { NavbarModule } from "./navbar/navbar.module";
import { ProjectsModule } from "./projects/projects.module";
import { TeamModule } from "./team/team.module";
import { CompaniesModule } from "./companies/companies.module";
/* Component import */
import { AppComponent } from "./app.component";
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DescriptionProjectModule,
    HomepageModule,
    ProjectsModule,
    IdeasModule,
    MindsetModule,
    TeamModule,
    NavbarModule,
    ReactiveFormsModule,
    OwnRouterModule,
    CompaniesModule,
    UserAuthModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [ApiHttpService, AuthguardService, Globals, SharedNotificationService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}

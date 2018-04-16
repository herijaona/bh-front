import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
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
/* Component import */
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
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
    UserAuthModule,
    MDBBootstrapModule.forRoot(),
    Ng4LoadingSpinnerModule
  ],
  exports: [RouterModule],
  providers: [ApiHttpService, AuthguardService, Globals, SharedNotificationService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}

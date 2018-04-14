import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
/* Routes */
import { OwnRouterModule } from "./routers/own-router.module";
/* Services */
import { ApiHttpService } from "./services/api-http/api-http.service";
import { AuthguardService } from "./services/authguard/authguard.service";
/*Modules impot*/
import {UserAuthModule} from "./user-auth/user-auth.module";
/* Component import */
import { AppComponent } from "./app.component";
import { IdeasComponent } from "./ideas/ideas/ideas.component";
import { MindsetComponent } from "./mindset/mindset/mindset.component";
import { ProjectsComponent } from "./projects/projects/projects.component";
import { DescriptionProjectModule } from "./description-project/description-project.module";
import { TeamComponent } from "./team/team/team.component";
import { HomepageComponent } from "./homepage/homepage/homepage.component";
import { NavbarComponent } from "./navbar/navbar/navbar.component";
import { HomesliderComponent } from "./homepage/homeslider/homeslider.component";


@NgModule({
  declarations: [
    AppComponent,
    MindsetComponent,
    HomepageComponent,
    TeamComponent,
    ProjectsComponent,
    IdeasComponent,
    NavbarComponent,
    HomesliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DescriptionProjectModule,
    ReactiveFormsModule,
    OwnRouterModule,
    UserAuthModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [ApiHttpService,AuthguardService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Routes, RouterModule } from "@angular/router";
/* Routes */
import { OwnRouterModule } from "./routers/own-router.module";
/*Modules impot*/
import {UserAuthModule} from "./user-auth/user-auth.module";
/* Component import */
import { AppComponent } from "./app.component";
import { IdeasComponent } from "./ideas/ideas/ideas.component";
import { MindsetComponent } from "./mindset/mindset/mindset.component";
import { ProjectsComponent } from "./projects/projects/projects.component";
import { DescriptionProjectComponent } from "./description-project/description-project/description-project.component";
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
    DescriptionProjectComponent,
    NavbarComponent,
    HomesliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OwnRouterModule,
    UserAuthModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}

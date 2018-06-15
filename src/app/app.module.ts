import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Routes */
import { OwnRouterModule } from './routers/own-router.module';
/* Services */
import { ApiHttpService } from './services/api-http/api-http.service';
import { TeamsService } from './services/teams/teams.service';
import { AuthguardService } from './services/authguard/authguard.service';
import { IsloggedVerifyGuard } from './services/authguard/islogged-verify.guard';
import { Globals } from './globals/globals';
import { Currency } from './globals/currency';
import { SharedNotificationService } from './services/shared-notification/shared-notification.service';
import { BaseHttpService } from './services/base-http/base-http.service';
import { CompanyService } from './services/company/company.service';
import { ProjectsService } from './services/projects/projects.service';
import { RequestInterceptorService } from './services/request-interceptor/request-interceptor.service';
import { IsActiveGuardService } from './services/authguard/is-active-guard.service';

/*pipe*/

/*Modules impot*/
import { AdministrationInModule } from './administration-in/administration-in.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { HomepageModule } from './homepage/homepage.module';
import { IdeasModule } from './ideas/ideas.module';
import { MindsetModule } from './mindset/mindset.module';
import { GeneralUtilitiesModule } from './general-utilities/general-utilities.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProjectsModule } from './projects/projects.module';
import { TeamModule } from './team/team.module';
import { ProfileAdminModule } from './profile-admin/profile-admin.module';
import { MembersAdminModule } from './members-admin/members-admin.module';
import { CCapitalModule } from './c-capital/c-capital.module';
import { TabModule } from 'angular-tabs-component';

/* Component import */
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    TabModule,
    FormsModule,
    HttpClientModule,
    GeneralUtilitiesModule,
    HomepageModule,
    ProjectsModule,
    IdeasModule,
    MindsetModule,
    ProfileAdminModule,
    MembersAdminModule,
    TeamModule,
    NavbarModule,
    ReactiveFormsModule,
    AdministrationInModule,
    OwnRouterModule,
    UserAuthModule,
    CCapitalModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    ApiHttpService,
    AuthguardService,
    Globals,
    Currency,
    IsloggedVerifyGuard,
    RequestInterceptorService,
    SharedNotificationService,
    TeamsService,
    BaseHttpService,
    ProjectsService,
    CompanyService,
    IsActiveGuardService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

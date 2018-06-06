import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

import { MembersAdminModule } from '../members-admin/members-admin.module';
import { GeneralUtilitiesModule } from '../general-utilities/general-utilities.module';

import { ProfileComponent } from './profile/profile.component';
import { CollaborationsComponent } from './collaborations/collaborations.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { PInfoComponent } from './profile/p-info/p-info.component';
import { ProjectEditAndNewComponent } from './collaborations/project-edit-and-new/project-edit-and-new.component';
import { InnovationProjectComponent } from './collaborations/innovation-project/innovation-project.component';
import { PCompletionComponent } from './profile/p-completion/p-completion.component';
import { MembersAdminComponent } from './members-admin/members-admin.component';
import { AdminAllColabComponent } from './collaborations/admin-all-colab/admin-all-colab.component';
import { CommunitiesComponent } from './communities/communities.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SomeDateComponent } from './collaborations/innovation-project/some-date/some-date.component';
import { ApplyComponent } from './collaborations/apply/apply.component';
import { ApplicationSentComponent } from "./collaborations/application-sent/application-sent.component";
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { PositionsComponent } from './positions/positions.component';
import { ApplyInnovProjectComponent } from './collaborations/apply/apply-innov-project/apply-innov-project.component';
import { QuestionComponent } from './collaborations/question/question.component';
import { QuestionsDetailsComponent } from './mydesk/questions-details/questions-details.component';
import { ViewApplicationDetailsComponent } from './mydesk/view-application-details/view-application-details.component';
import { FavoriteComponent } from './mydesk/favorite/favorite.component';
import { InvitedOrganisationComponent } from './mydesk/invited-organisation/invited-organisation.component';
import { MydeskComponent } from './mydesk/mydesk.component';
import { ApplicationComponent } from './collaborations/application/application.component';
import { ViewReactionComponent } from './mydesk/view-reaction/view-reaction.component';
import { ApplicationReportComponent } from './collaborations/application-report/application-report.component';


@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule,
    Ng4GeoautocompleteModule.forRoot(),
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    MyDatePickerModule,
    RouterModule,
    MembersAdminModule,
    GeneralUtilitiesModule
  ],
  declarations: [
    MydeskComponent,
    ViewReactionComponent,
    CollaborationsComponent,
    ProjectEditAndNewComponent,
    ViewApplicationDetailsComponent,
    InnovationProjectComponent,
    QuestionsDetailsComponent,
    PInfoComponent,
    MembersAdminComponent,
    PCompletionComponent,
    ProfileComponent,
    NavbarAdminComponent,
    AdminAllColabComponent,
    CommunitiesComponent,
    SomeDateComponent,
    ApplyComponent,
    ApplicationSentComponent,
    FavoriteComponent,
    InvitedOrganisationComponent,
    OpportunitiesComponent,
    PositionsComponent,
    ApplyInnovProjectComponent,
    QuestionComponent,
    ApplicationReportComponent,
    ApplicationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NavbarAdminComponent],
  entryComponents: [ProjectEditAndNewComponent]
})
export class AdministrationInModule {}

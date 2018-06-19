import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

import { GeneralUtilitiesModule } from '../general-utilities/general-utilities.module';

import { ProfileComponent } from './profile/profile.component';
import { CollaborationsComponent } from './collaborations/collaborations.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { PInfoComponent } from './profile/p-info/p-info.component';
import { ProjectEditAndNewComponent } from './collaborations/project-edit-and-new/project-edit-and-new.component';
import { InnovationProjectComponent } from './collaborations/project-edit-and-new/innovation-project/innovation-project.component';
import { PCompletionComponent } from './profile/p-completion/p-completion.component';
import { MembersAdminComponent } from './mydesk/members-admin/members-admin.component';
import { AdminAllColabComponent } from './collaborations/admin-all-colab/admin-all-colab.component';
import { CommunitiesComponent } from './communities/communities.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SomeDateComponent } from './collaborations/project-edit-and-new/innovation-project/some-date/some-date.component';
import { ApplyComponent } from './collaborations/apply/apply.component';
import { ApplicationSentComponent } from './collaborations/application-sent/application-sent.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { PositionsComponent } from './positions/positions.component';
import { ApplyInnovProjectComponent } from './collaborations/apply/apply-innov-project/apply-innov-project.component';
import { QuestionComponent } from './collaborations/question/question.component';
import { QuestionsDetailsComponent } from './mydesk/questions-details/questions-details.component';
import { FavoriteComponent } from './mydesk/favorite/favorite.component';
import { InvitedOrganisationComponent } from './mydesk/invited-organisation/invited-organisation.component';
import { MydeskComponent } from './mydesk/mydesk.component';
import { ApplicationComponent } from './collaborations/application/application.component';
import { ViewReactionComponent } from './mydesk/view-reaction/view-reaction.component';
import { ApplicationReceivedComponent } from './collaborations/application-received/application-received.component';
import { EcosystemComponent } from './communities/ecosystem/ecosystem.component';
import { OneCollabApplicationComponent } from './collaborations/one-collab-application/one-collab-application.component';
import { DealSpaceComponent } from './deal-space/deal-space.component';
import { QuestionAnswersComponent } from './deal-space/question-answers/question-answers.component';
import { ApplicationDealComponent } from './deal-space/application-deal/application-deal.component';
import { FilesDealComponent } from './deal-space/files-deal/files-deal.component';
import { PlanningDealComponent } from './deal-space/planning-deal/planning-deal.component';
import { HistoricalComponent } from './mydesk/historical/historical.component';
import { IdeasDeskComponent } from './mydesk/ideas-desk/ideas-desk.component';
import { ApplicationFormComponent } from './collaborations/application-form/application-form.component';
import { InactiveAccountComponent } from './extra/inactive-account/inactive-account.component';
import { ApplicationReceivedbyCollaborationComponent } from './collaborations/application-receivedby-collaboration/application-receivedby-collaboration.component';
import { ErrorNotificationComponent } from './extra/error-notification/error-notification.component';
import { MembersCommunitiesComponent } from './communities/members-communities/members-communities.component';
import { UnderCommunitiesComponent } from './communities/under-communities/under-communities.component';
import { CommunitySpaceComponent } from './communities/community-space/community-space.component';
import { SettingComponent } from './setting/setting.component';
import { FavoritePage1Component } from './mydesk/invited-organisation/favorite-page1/favorite-page1.component';
import { FavoritePage2Component } from './mydesk/invited-organisation/favorite-page2/favorite-page2.component';
import { FavoritePage3Component } from './mydesk/invited-organisation/favorite-page3/favorite-page3.component';
import { ReceivedInvitationsComponent } from './collaborations/received-invitations/received-invitations.component';

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
    GeneralUtilitiesModule,
  ],
  declarations: [
    MydeskComponent,
    ViewReactionComponent,
    CollaborationsComponent,
    ProjectEditAndNewComponent,
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
    ApplicationReceivedComponent,
    ApplicationComponent,
    EcosystemComponent,
    OneCollabApplicationComponent,
    DealSpaceComponent,
    QuestionAnswersComponent,
    ApplicationDealComponent,
    FilesDealComponent,
    PlanningDealComponent,
    HistoricalComponent,
    IdeasDeskComponent,
    ApplicationFormComponent,
    InactiveAccountComponent,
    ApplicationReceivedbyCollaborationComponent,
    ErrorNotificationComponent,
    MembersCommunitiesComponent,
    UnderCommunitiesComponent,
    CommunitySpaceComponent,
    SettingComponent,
    FavoritePage1Component,
    FavoritePage2Component,
    FavoritePage3Component,
    ReceivedInvitationsComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NavbarAdminComponent],
  entryComponents: [ProjectEditAndNewComponent],
})
export class AdministrationInModule {}

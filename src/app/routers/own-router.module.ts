import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* Component Import*/
import { IdeasComponent } from '../ideas/ideas/ideas.component';
import { MindsetComponent } from '../mindset/mindset/mindset.component';
import { ProjectsComponent } from '../projects/projects/projects.component';
import { DescriptionProjectComponent } from '../description-project/description-project/description-project.component';
import { TeamComponent } from '../team/team/team.component';
import { HomepageComponent } from '../homepage/homepage/homepage.component';
import { RegistrationComponent } from '../user-auth/registration/registration.component';
import { ResetPasswordComponent } from '../user-auth/reset-password/reset-password.component';
import { ActivationComponent } from '../user-auth/activation/activation.component';
import { PageLoginComponent } from '../user-auth/page-login/page-login.component';
import { ProfileAdminComponent } from '../profile-admin/profile-admin/profile-admin.component';
import { IsloggedVerifyGuard } from '../services/authguard/islogged-verify.guard';
import { AuthguardService } from '../services/authguard/authguard.service';
import { CommitteeComponent } from '../committee/committee/committee.component';
import { InvitedRegisterComponent } from '../user-auth/invited-register/invited-register.component';
import { SignUpComponent } from '../user-auth/sign-up/sign-up.component';
import { ApplicationReceivedComponent } from '../administration-in/collaborations/application-received/application-received.component';
import { Project1Component } from '../c-capital/project1/project1.component';
import { ProjectDescriptionComponent } from '../c-capital/project-description/project-description.component';
import { ProfileComponent } from '../administration-in/profile/profile.component';
import { MembersAdminComponent } from '../administration-in/members-admin/members-admin.component';
import { QuestionsDetailsComponent } from '../administration-in/mydesk/questions-details/questions-details.component';
import { AdminAllColabComponent } from '../administration-in/collaborations/admin-all-colab/admin-all-colab.component';
import { ProjectEditAndNewComponent } from '../administration-in/collaborations/project-edit-and-new/project-edit-and-new.component';
import { ApplicationSentComponent } from '../administration-in/collaborations/application-sent/application-sent.component';
import { ApplyComponent } from '../administration-in/collaborations/apply/apply.component';
import { CollaborationsComponent } from '../administration-in/collaborations/collaborations.component';
import { QuestionComponent } from '../administration-in/collaborations/question/question.component';
import { IdeasDeskComponent } from '../administration-in/mydesk/ideas-desk/ideas-desk.component';
import { FavoriteComponent } from '../administration-in/mydesk/favorite/favorite.component';
import { ApplicationComponent } from '../administration-in/collaborations/application/application.component';
import { InvitedOrganisationComponent } from '../administration-in/mydesk/invited-organisation/invited-organisation.component';
import { MydeskComponent } from '../administration-in/mydesk/mydesk.component';
import { CommunitiesComponent } from '../administration-in/communities/communities.component';
import { EcosystemComponent } from '../administration-in/communities/ecosystem/ecosystem.component';
import { QuestionCommunitiesComponent } from '../administration-in/communities/question-communities/question-communities.component';
import { IdeasCommunitiesComponent } from '../administration-in/communities/ideas/ideas.component';
import { OpportunitiesComponent } from '../administration-in/opportunities/opportunities.component';
import { PositionsComponent } from '../administration-in/positions/positions.component';
import { DealSpaceComponent } from '../administration-in/deal-space/deal-space.component';
import { QuestionAnswersComponent } from '../administration-in/deal-space/question-answers/question-answers.component';
import { ApplicationDealComponent } from '../administration-in/deal-space/application-deal/application-deal.component';
import { FilesDealComponent } from '../administration-in/deal-space/files-deal/files-deal.component';
import { PlanningDealComponent } from '../administration-in/deal-space/planning-deal/planning-deal.component';
import { ViewReactionComponent } from '../administration-in/mydesk/view-reaction/view-reaction.component';
import { HistoricalComponent } from '../administration-in/mydesk/historical/historical.component';

// import { UserAuthModule } from '../user-auth/user-auth.module';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'committee',
    component: CommitteeComponent,
  },
  {
    path: 'profile-admin',
    component: ProfileAdminComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'project1',
    component: Project1Component,
  },
  {
    path: 'project-description',
    component: ProjectDescriptionComponent,
  },
  {
    path: 'open-innovation/:slug_acc/acceuil',
    component: MindsetComponent,
  },
  {
    path: 'open-innovation/:slug_acc/team',
    component: TeamComponent,
  },
  {
    path: 'open-innovation/:slug_acc/projects',
    component: ProjectsComponent,
  },
  {
    path: 'open-innovation/:slug_acc/details-project/:project_id',
    component: DescriptionProjectComponent,
  },
  {
    path: 'open-innovation/:slug_acc/success-stories',
    component: IdeasComponent,
  },
  {
    path: 'register-organisation',
    component: RegistrationComponent,
    canActivate: [IsloggedVerifyGuard],
  },
  {
    path: 'activate/:code',
    component: ActivationComponent,
  },
  {
    path: 'login',
    component: PageLoginComponent,
  },
  {
    path: 'sign-in',
    component: SignUpComponent,
  },
  {
    path: 'administration-in/user/profile',
    component: ProfileComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'administration-in/desk',
    component: MydeskComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: '',
        component: MembersAdminComponent,
      },
      {
        path: 'questions',
        component: ViewReactionComponent,
      },
      {
        path: 'ideas',
        component: IdeasDeskComponent,
      },
      {
        path: 'questions/details/:qID',
        component: QuestionsDetailsComponent,
      },
      {
        path: 'favorite',
        component: FavoriteComponent,
      },
      {
        path: 'invited-organisation',
        component: InvitedOrganisationComponent,
      },
      {
        path: 'historical',
        component: HistoricalComponent,
      },
    ],
  },
  {
    path: 'administration-in/collaborations',
    component: CollaborationsComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: '',
        component: AdminAllColabComponent,
      },
      {
        path: 'apply/:id_project',
        component: ApplyComponent,
      },
      {
        path: 'application-sent',
        component: ApplicationSentComponent,
      },
      {
        path: 'application-received/by-collaborations/:idCollab',
        component: ApplicationReceivedComponent,
      },
      {
        path: 'application-received',
        component: ApplicationReceivedComponent,
      },
      {
        path: 'create/:item-slug',
        component: ProjectEditAndNewComponent,
      },
      {
        path: 'application/details/:applicationID',
        component: ApplicationComponent,
      },
      {
        path: 'question',
        component: QuestionComponent,
      },
    ],
  },
  {
    path: 'administration-in/communities',
    component: CommunitiesComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: '',
        component: EcosystemComponent,
      },
      {
        path: 'ideas',
        component: IdeasCommunitiesComponent,
      },
      {
        path: 'questions',
        component: QuestionCommunitiesComponent,
      },
    ],
  },
  {
    path: 'administration-in/opportunities',
    component: OpportunitiesComponent,
    canActivate: [AuthguardService],
    children: [],
  },
  {
    path: 'administration-in/positions',
    component: PositionsComponent,
    canActivate: [AuthguardService],
    children: [],
  },
  {
    path: 'administration-in/deal-space',
    component: DealSpaceComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: 'question-answers',
        component: QuestionAnswersComponent,
      },
      {
        path: 'application',
        component: ApplicationDealComponent,
      },
      {
        path: 'files',
        component: FilesDealComponent,
      },
      {
        path: 'planning',
        component: PlanningDealComponent,
      },
    ],
  },

  {
    path: 'c-capital/description-project',
    component: ProjectDescriptionComponent,
  },
  {
    path: 'reset-my-pass/:id_/:pass_code',
    component: ResetPasswordComponent,
  },
  {
    path: 'invitation_response/:acc_slug/invitation/:invit_id',
    component: InvitedRegisterComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class OwnRouterModule {}

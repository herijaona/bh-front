import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/* Component Import*/
import { CollaborationsComponent } from "../administration-in/collaborations/collaborations.component";
import { MydeskComponent } from "../administration-in/mydesk/mydesk.component";
import { IdeasComponent } from "../ideas/ideas/ideas.component";
import { MindsetComponent } from "../mindset/mindset/mindset.component";
import { ProjectsComponent } from "../projects/projects/projects.component";
import { DescriptionProjectComponent } from "../description-project/description-project/description-project.component";
import { TeamComponent } from "../team/team/team.component";
import { HomepageComponent } from "../homepage/homepage/homepage.component";
import { RegistrationComponent } from "../user-auth/registration/registration.component";
import { ResetPasswordComponent } from "../user-auth/reset-password/reset-password.component";
import { ActivationComponent } from "../user-auth/activation/activation.component";
import { PageLoginComponent } from "../user-auth/page-login/page-login.component";
import { ProfileComponent } from "../administration-in/profile/profile.component";
import { ProfileAdminComponent } from "../profile-admin/profile-admin/profile-admin.component";
import { MembersAdminComponent } from "../administration-in/members-admin/members-admin.component";
import { AuthguardService } from "../services/authguard/authguard.service";
import { ListCompaniesComponent } from "../companies/list-companies/list-companies.component";
import { ProfileCompaniesComponent } from "../companies/profile-companies/profile-companies.component";
import { GeneralComponent } from "../companies/utilprofile/general/general.component";
import { OwnUserComponent } from "../companies/utilprofile/own-user/own-user.component";
import { ProjetProfileComponent } from "../companies/utilprofile/projet-profile/projet-profile.component";
import { JobOnCompProfileComponent } from "../companies/utilprofile/job-on-comp-profile/job-on-comp-profile.component";
import { EventOnCompProfileComponent } from "../companies/utilprofile/event-on-comp-profile/event-on-comp-profile.component";
import { CommitteeComponent } from "../committee/committee/committee.component";
import { InvitedRegisterComponent } from "../user-auth/invited-register/invited-register.component";
import { SignUpComponent } from "../user-auth/sign-up/sign-up.component";
import { ViewReactionComponent } from "../company-data/view-reaction/view-reaction.component";
import { ViewApplicationDetailsComponent } from "../company-data/view-application-details/view-application-details.component";
import { QuestionsDetailsComponent } from "../company-data/questions-details/questions-details.component";
import { ApplicationReportComponent } from "../company-data/application-report/application-report.component";
import { Project1Component } from "../project1/project1/project1.component";
import { AdminAllColabComponent } from "../administration-in/collaborations/admin-all-colab/admin-all-colab.component";
import { ProjectEditAndNewComponent } from "../administration-in/collaborations/project-edit-and-new/project-edit-and-new.component";



// import { UserAuthModule } from "../user-auth/user-auth.module";

const routes: Routes = [
	{ path: "", component: HomepageComponent },
	{ path: "collaborations", component: CollaborationsComponent },
	{ path: "mydesk", component: MydeskComponent },
	{ path: "committee", component: CommitteeComponent },
	{ path: "profile-admin", component: ProfileAdminComponent },
	{ path: "members-admin", component: MembersAdminComponent },
	{ path: "home", component: HomepageComponent },
	{ path: "project1", component: Project1Component },
	{ path: "mindset", component: MindsetComponent },
	{ path: "open-innovation/:slug_acc/acceuil", component: MindsetComponent },
	{ path: "open-innovation/:slug_acc/team", component: TeamComponent },
	{
		path: "open-innovation/:slug_acc/projects",
		component: ProjectsComponent
	},
	{
		path: "open-innovation/:slug_acc/details-project/:project_id",
		component: DescriptionProjectComponent
	},
	{
		path: "open-innovation/:slug_acc/success-stories",
		component: IdeasComponent
	},
	{ path: "team", component: TeamComponent },
	{ path: "projects", component: ProjectsComponent },
	{ path: "description-project", component: DescriptionProjectComponent },
	{ path: "ideas", component: IdeasComponent },
	{ path: "registerCompany", component: RegistrationComponent },
	{ path: "activate/:code", component: ActivationComponent },
	{ path: "login", component: PageLoginComponent },
	{ path: "sign-in", component: SignUpComponent },
	{ path: "all-companies", component: ListCompaniesComponent },
	{
		path: "view-project-application",
		component: ApplicationReportComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "view-all-reaction",
		component: ViewReactionComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "candidature/details/:id_appl",
		component: ViewApplicationDetailsComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "administration-in/user/profile",
		component: ProfileComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "questions/details/:id_questions",
		component: QuestionsDetailsComponent,
		canActivate: [AuthguardService]
	},

	{
		path: "administration-in/desk",
		component: MydeskComponent,
		canActivate: [AuthguardService],
		children: [
			{
				path: "",
				component: MembersAdminComponent
			},
			{
				path: "applications",
				component: ViewReactionComponent
			},
			{
				path: "questions",
				component: ViewReactionComponent
			}
		]
	},
	{
		path: "administration-in/collaborations",
		component: CollaborationsComponent,
		canActivate: [AuthguardService],
		children: [
			{
				path: "",
				component: AdminAllColabComponent
			},
			{
				path: "create-collaboration",
				component: ProjectEditAndNewComponent
			}
		]
	},
	{
		path: "reset-my-pass/:id_/:pass_code",
		component: ResetPasswordComponent
	},
	{
		path: "invitation_response/:acc_slug/invitation/:invit_id",
		component: InvitedRegisterComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class OwnRouterModule {}

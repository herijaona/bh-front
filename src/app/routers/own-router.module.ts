import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/* Component Import*/
import { IdeasComponent } from "../ideas/ideas/ideas.component";
import { MindsetComponent } from "../mindset/mindset/mindset.component";
import { ProjectsComponent } from "../projects/projects/projects.component";
import { DescriptionProjectComponent } from "../description-project/description-project/description-project.component";
import { TeamComponent } from "../team/team/team.component";
import { HomepageComponent } from "../homepage/homepage/homepage.component";
import { RegistrationComponent } from "../user-auth/registration/registration.component";
import { ResetPasswordComponent } from "../user-auth/reset-password/reset-password.component";
import { ActivationComponent } from "../user-auth/activation/activation.component";
import { LoginComponent } from "../user-auth/login/login.component";
import { ProfileComponent } from "../user-auth/profile/profile.component";
import { ProfileAdminComponent } from "../profile-admin/profile-admin/profile-admin.component";
import { MembersAdminComponent } from "../members-admin/members-admin/members-admin.component";
import { AuthguardService } from "../services/authguard/authguard.service";
import { ListCompaniesComponent } from "../companies/list-companies/list-companies.component";
import { ProfileCompaniesComponent } from "../companies/profile-companies/profile-companies.component";
import { GeneralComponent } from "../companies/utilprofile/general/general.component";
import { OwnUserComponent } from "../companies/utilprofile/own-user/own-user.component";
import { ProjetProfileComponent } from "../companies/utilprofile/projet-profile/projet-profile.component";
import { JobOnCompProfileComponent } from "../companies/utilprofile/job-on-comp-profile/job-on-comp-profile.component";
import { EventOnCompProfileComponent } from "../companies/utilprofile/event-on-comp-profile/event-on-comp-profile.component";
import { CommitteeComponent } from "../committee/committee/committee.component";

// import { UserAuthModule } from "../user-auth/user-auth.module";

const routes: Routes = [
	{ path: "", component: HomepageComponent },
	{ path: "committee", component: CommitteeComponent },
	{ path: "profile-admin", component: ProfileAdminComponent },
	{ path: "members-admin", component: MembersAdminComponent },
	{ path: "home", component: HomepageComponent },
	{ path: "mindset", component: MindsetComponent },
	{ path: "Open-innovation/:slug_acc/Acceuil", component: MindsetComponent },
	{ path: "Open-innovation/:slug_acc/team", component: TeamComponent },
	{ path: "Open-innovation/:slug_acc/projects", component: ProjectsComponent },
	{ path: "Open-innovation/:slug_acc/projects/:id_project", component: DescriptionProjectComponent },
	{ path: "team", component: TeamComponent },
	{ path: "projects", component: ProjectsComponent },
	{ path: "description-project", component: DescriptionProjectComponent },
	{ path: "ideas", component: IdeasComponent },
	{ path: "registerCompany", component: RegistrationComponent },
	{ path: "activate/:code", component: ActivationComponent },
	{
		path: "company/:name/profile/:_id",
		component: ProfileCompaniesComponent,
		children: [
			{
				path: "",
				component: GeneralComponent,
				outlet: "company"
			},
			{
				path: "user",
				component: OwnUserComponent,
				outlet: "company"
			},
			{
				path: "projet",
				component: ProjetProfileComponent,
				outlet: "company"
			},
			{
				path: "job",
				component: JobOnCompProfileComponent,
				outlet: "company"
			},
			{
				path: "event",
				component: EventOnCompProfileComponent,
				outlet: "company"
			}
		],
		canActivate: [AuthguardService]
	},
	{ path: "login", component: LoginComponent },
	{ path: "all-companies", component: ListCompaniesComponent },
	{
		path: "Administration",
		component: ProfileComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "reset-my-pass/:id_/:pass_code",
		component: ResetPasswordComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class OwnRouterModule {}

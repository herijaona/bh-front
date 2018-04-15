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
import { ActivationComponent } from "../user-auth/activation/activation.component";
import { LoginComponent } from "../user-auth/login/login.component";
import { ProfileComponent } from "../user-auth/profile/profile.component";
import { AuthguardService } from "../services/authguard/authguard.service";

// import { UserAuthModule } from "../user-auth/user-auth.module";

const routes: Routes = [
	{ path: "", component: HomepageComponent },
	{ path: "home", component: HomepageComponent },
	{ path: "mindset", component: MindsetComponent },
	{ path: "team", component: TeamComponent },
	{ path: "projects", component: ProjectsComponent },
	{ path: "description-project", component: DescriptionProjectComponent },
	{ path: "ideas", component: IdeasComponent },
	{ path: "registerCompany", component: RegistrationComponent },
	{ path: "activate/:code", component: ActivationComponent },
	{ path: "login", component: LoginComponent },
	{
		path: "profile",
		component: ProfileComponent,
		canActivate: [AuthguardService]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class OwnRouterModule {}

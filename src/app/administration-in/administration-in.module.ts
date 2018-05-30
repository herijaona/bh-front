import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MydeskComponent } from "./mydesk/mydesk.component";
import { MembersAdminModule } from "../members-admin/members-admin.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { CKEditorModule } from "ng2-ckeditor";
import { Ng4GeoautocompleteModule } from "ng4-geoautocomplete";

import { ProfileComponent } from "./profile/profile.component";
import { CollaborationsComponent } from "./collaborations/collaborations.component";
import { NavbarAdminComponent } from "./navbar-admin/navbar-admin.component";
import { PInfoComponent } from "./profile/p-info/p-info.component";
import { ProjectEditAndNewComponent } from "./collaborations/project-edit-and-new/project-edit-and-new.component";
import { InnovationProjectComponent } from "./collaborations/innovation-project/innovation-project.component";
import { QuestionsDetailsComponent } from "./mydesk/questions-details/questions-details.component";
import { PCompletionComponent } from "./profile/p-completion/p-completion.component";
import { MembersAdminComponent } from "./members-admin/members-admin.component";
import { AdminAllColabComponent } from "./collaborations/admin-all-colab/admin-all-colab.component";

@NgModule({
	imports: [
		CommonModule,
		MDBBootstrapModule,
		Ng4GeoautocompleteModule.forRoot(),
		ReactiveFormsModule,
		CKEditorModule,
		FormsModule,
		RouterModule,
		MembersAdminModule
	],
	declarations: [
		MydeskComponent,
		CollaborationsComponent,
		ProjectEditAndNewComponent,
		InnovationProjectComponent,
		QuestionsDetailsComponent,
		PInfoComponent,
		MembersAdminComponent,
		PCompletionComponent,
		ProfileComponent,
		NavbarAdminComponent,
		AdminAllColabComponent
	],
	schemas: [NO_ERRORS_SCHEMA],
	exports: [NavbarAdminComponent],
	entryComponents: [ProjectEditAndNewComponent]
})
export class AdministrationInModule {}

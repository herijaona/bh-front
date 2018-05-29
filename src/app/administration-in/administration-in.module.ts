import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MydeskComponent } from "./mydesk/mydesk.component";
import { MembersAdminModule } from "../members-admin/members-admin.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { Ng4GeoautocompleteModule } from "ng4-geoautocomplete";

import { ProfileComponent } from "./profile/profile.component";
import { CollaborationsComponent } from "./collaborations/collaborations.component";
import { NavbarAdminComponent } from "./navbar-admin/navbar-admin.component";
import { PInfoComponent } from "./profile/p-info/p-info.component";
import { PCompletionComponent } from "./profile/p-completion/p-completion.component";
import { MembersAdminComponent } from "./members-admin/members-admin.component";

@NgModule({
	imports: [
		CommonModule,
		MDBBootstrapModule,
		Ng4GeoautocompleteModule.forRoot(),
		ReactiveFormsModule,
		FormsModule,
		RouterModule,
		MembersAdminModule
	],
	declarations: [
		MydeskComponent,
		CollaborationsComponent,
		PInfoComponent,
		MembersAdminComponent,
		PCompletionComponent,
		ProfileComponent,
		NavbarAdminComponent
	],
	schemas: [NO_ERRORS_SCHEMA],
	exports: [NavbarAdminComponent]
})
export class AdministrationInModule {}

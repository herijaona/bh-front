import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MydeskComponent } from "./mydesk/mydesk.component";
import { RouterModule } from "@angular/router";
import { MembersAdminModule } from "../members-admin/members-admin.module";

@NgModule({
	imports: [CommonModule, RouterModule, MembersAdminModule],
	declarations: [MydeskComponent]
})
export class MydeskModule {}

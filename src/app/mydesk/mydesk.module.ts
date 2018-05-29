import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MydeskComponent } from './mydesk/mydesk.component';
import { MembersAdminModule } from '../members-admin/members-admin.module';
import { CollaborationsComponent } from './collaborations/collaborations.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';

@NgModule({
  imports: [
    CommonModule,
    MembersAdminModule
  ],
  declarations: [MydeskComponent, CollaborationsComponent, NavbarAdminComponent],
  	exports: [
		NavbarAdminComponent
	]
})
export class MydeskModule { }

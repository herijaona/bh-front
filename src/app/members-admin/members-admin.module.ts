import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersAdminComponent } from './members-admin/members-admin.component';
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";


@NgModule({
  imports: [
    CommonModule,GeneralUtilitiesModule
  ],
  declarations: [MembersAdminComponent]
})
export class MembersAdminModule { }

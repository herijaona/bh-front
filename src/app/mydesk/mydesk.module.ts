import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MydeskComponent } from './mydesk/mydesk.component';
import { MembersAdminModule } from '../members-admin/members-admin.module';

@NgModule({
  imports: [
    CommonModule,
    MembersAdminModule
  ],
  declarations: [MydeskComponent]
})
export class MydeskModule { }

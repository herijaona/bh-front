import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { PageHeaderComponent } from "../mindset/page-header/page-header.component";
import { MindsetModule } from "../mindset/mindset.module";
import { Routes, RouterModule } from "@angular/router";





@NgModule({
  imports: [
    CommonModule,
    MindsetModule,
    RouterModule
  ],
  declarations: [TeamComponent]
})
export class TeamModule { }

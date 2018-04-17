import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { ProfileCompaniesComponent } from './profile-companies/profile-companies.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ListCompaniesComponent, ProfileCompaniesComponent]
})
export class CompaniesModule { }

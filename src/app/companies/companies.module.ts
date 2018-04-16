import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ListCompaniesComponent } from './list-companies/list-companies.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ListCompaniesComponent]
})
export class CompaniesModule { }

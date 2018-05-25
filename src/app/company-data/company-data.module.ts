import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationReportComponent } from './application-report/application-report.component';
import { ViewReactionComponent } from './view-reaction/view-reaction.component';
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";

@NgModule({
  imports: [
    CommonModule,
    GeneralUtilitiesModule
  ],
  declarations: [ApplicationReportComponent, ViewReactionComponent]
})
export class CompanyDataModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationReportComponent } from "./application-report/application-report.component";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { RouterModule } from "@angular/router";

@NgModule({
	imports: [CommonModule, GeneralUtilitiesModule, RouterModule],
	declarations: [ApplicationReportComponent]
})
export class CompanyDataModule {}

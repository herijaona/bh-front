import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationReportComponent } from "./application-report/application-report.component";
import { ViewReactionComponent } from "./view-reaction/view-reaction.component";
import { GeneralUtilitiesModule } from "../general-utilities/general-utilities.module";
import { RouterModule } from "@angular/router";

import { ViewApplicationDetailsComponent } from "./view-application-details/view-application-details.component";
import { QuestionsDetailsComponent } from './questions-details/questions-details.component';

@NgModule({
	imports: [CommonModule, GeneralUtilitiesModule, RouterModule],
	declarations: [
		ApplicationReportComponent,
		ViewReactionComponent,
		ViewApplicationDetailsComponent,
		QuestionsDetailsComponent
	]
})
export class CompanyDataModule {}

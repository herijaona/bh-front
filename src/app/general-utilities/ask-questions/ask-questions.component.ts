import { Component, OnInit, ViewChild } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { ModalDirective } from "angular-bootstrap-md";

@Component({
	selector: "ask-questions",
	templateUrl: "./ask-questions.component.html",
	styleUrls: ["./ask-questions.component.scss"]
})
export class AskQuestionsComponent implements OnInit {
	constructor(
		private sh: SharedNotificationService,
		private auth: AuthserviceService
	) {}

	ngOnInit() {}
	loginProcess() {}

	askQuestion() {}
}

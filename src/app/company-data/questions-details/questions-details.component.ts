import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { TeamsService } from "../../services/teams/teams.service";

@Component({
	selector: "questions-details",
	templateUrl: "./questions-details.component.html",
	styleUrls: ["./questions-details.component.scss"]
})
export class QuestionsDetailsComponent implements OnInit {
	public viewreaction_page: string = "viewreaction_page";
	public questionsID: string;
	public allQDet: any;
	public readytoshow: boolean = false;

	constructor(private tms: TeamsService, private activRoute: ActivatedRoute) {
		this.activRoute.params.subscribe((params_: any) => {
			this.questionsID = params_["id_questions"];
			this.getDetailsOnQuestions();
		});
	}
	ngOnInit() {}

	async getDetailsOnQuestions() {
		try {
			let qDet: any = await this.tms.getDetailsOnQuestion(
				this.questionsID
			);
			if (qDet) {
				if (qDet.status == "OK") {
					this.allQDet = qDet.data;
					this.readytoshow = true;
					console.log(qDet);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}
}

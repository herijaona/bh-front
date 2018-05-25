import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { TeamsService } from "../../services/teams/teams.service";

@Component({
	selector: "view-reaction",
	templateUrl: "./view-reaction.component.html",
	styleUrls: ["./view-reaction.component.scss"]
})
export class ViewReactionComponent implements OnInit {
	public viewreaction_page: string = "viewreaction_page";
	public allQuestions: any = [];
	constructor(private tms: TeamsService) {}

	ngOnInit() {
		this.getAllQuestions();
	}

	async getAllQuestions() {
		this.allQuestions = [];
		try {
			let quest : any = await this.tms.getAllQuestionsOnCompany();
			if (quest) {
				if(quest.status == "OK") {
					this.allQuestions = quest.data;
				}
			}
		} catch (e) {}
	}
}

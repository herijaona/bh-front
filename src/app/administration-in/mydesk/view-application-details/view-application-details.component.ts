import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../../globals/globals";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthserviceService } from "../../../services/authservice/authservice.service";
import { TeamsService } from "../../../services/teams/teams.service";
import { ProjectsService } from "../../../services/projects/projects.service";

@Component({
	selector: "view-application-details",
	templateUrl: "./view-application-details.component.html",
	styleUrls: ["./view-application-details.component.scss"]
})
export class ViewApplicationDetailsComponent implements OnInit {
	public applicationreport_page: string = "applicationreport_page";
	public currentCandidatureID: string = "";
	public readytoshow: boolean = false;
	public detailsAll = {};
	constructor(
		private pr: ProjectsService,
		private activRoute: ActivatedRoute
	) {
		this.activRoute.params.subscribe((params_: any) => {
			this.currentCandidatureID = params_["id_appl"];
			this.getDetailsOnCandidature();
		});
	}

	ngOnInit() {}
	async getDetailsOnCandidature() {
		this.detailsAll = [];
		try {
			let cDetails: any = await this.pr.getDetails(
				this.currentCandidatureID
			);
			if (cDetails) {
				if (cDetails.status == "OK") {
					this.detailsAll = cDetails.data;
					this.readytoshow = true;
				} else {
					// code...
				}
			}
		} catch (e) {
			console.log(e);
		}
	}
}

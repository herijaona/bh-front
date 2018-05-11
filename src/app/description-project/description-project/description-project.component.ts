import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { ProjectsService } from "../../services/projects/projects.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-description-project",
	templateUrl: "./description-project.component.html",
	styleUrls: ["./description-project.component.scss"]
})
export class DescriptionProjectComponent implements OnInit {
	public projet_page: string = "projet_page";
	public currentCompanySlug: string;
	public detailsData: any;
	public project_id: string;
	public hasData: boolean = false;
	constructor(
		public g: Globals,
		public sh: SharedNotificationService,
		public activRoute: ActivatedRoute,
		private pr: ProjectsService
	) {
		this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
			this.project_id = params_["project_id"];
			if (this.project_id) {
				this.getProjects();
			}
		});
	}
	async getProjects() {
		try {
			let prDet: any = await this.pr.getProjectByID(this.project_id);
			if (prDet.status == "OK") {
				this.detailsData = prDet.data;
				this.hasData = true;
			}
		} catch (e) {
			console.log(e);
		}
	}

	ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { ProjectsService } from "../../services/projects/projects.service";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "project-list",
	templateUrl: "./project-list.component.html",
	styleUrls: ["./project-list.component.scss"]
})
export class ProjectListComponent implements OnInit {
	public currentCompanySlug: string;
	public listData: any;
	constructor(
		public g: Globals,
		private activRoute: ActivatedRoute,
		private sh: SharedNotificationService,
		private pr: ProjectsService
	) {
		this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
			this.formatDataView();
		});
	}

	ngOnInit() {}

	async formatDataView() {
		try {
			let allProject: any = await this.pr.getCompanyProject(
				this.currentCompanySlug
			);
			console.log(allProject)
			if (allProject.status == "OK") {
				if(allProject.status == 'OK') {
					this.listData = allProject.data;
					console.log(this.listData)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
}

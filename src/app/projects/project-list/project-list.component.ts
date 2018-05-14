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
	public editPAGEstatus: boolean = false;
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

		this.sh.notifButton$.subscribe((st: any) => {
			if (st.no == "clck") {
				if (!st.state) {
					this.editPAGEstatus = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
	}

	ngOnInit() {
		this.sh.busDataIn$.subscribe((st: any) => {
			switch (st.from) {
				case "projectNEW":
					if (st.action == "refresh") {
						this.formatDataView();
					}
					break;
				default:
					break;
			}
		});
	}

	async formatDataView() {
		try {
			let allProject: any = await this.pr.getCompanyProject(
				this.currentCompanySlug
			);
			console.log(allProject);
			if (allProject.status == "OK") {
				if (allProject.status == "OK") {
					this.listData = allProject.data;
					console.log(this.listData);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	editProject(item) {
		this.sh.pushData({
			from: "editProject",
			action: "edit",
			data: item
		});
	}
	deleteProject(item) {}
}

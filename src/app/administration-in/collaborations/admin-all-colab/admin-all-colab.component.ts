import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "../../../services/projects/projects.service";
import { SharedNotificationService } from "./../../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../../globals/globals";
@Component({
	selector: "app-admin-all-colab",
	templateUrl: "./admin-all-colab.component.html",
	styleUrls: ["./admin-all-colab.component.scss"]
})
export class AdminAllColabComponent implements OnInit {
	constructor(
		public g: Globals,
		private pr: ProjectsService,
		private sh: SharedNotificationService
	) {}
	ngOnInit() {
		this.getMyCollabList();
	}
	async getMyCollabList() {
		try {
			let allCollabResp : any = await this.pr.getAllMyCollabList()
		} catch (e) {
			console.log(e);
		}
	}
}

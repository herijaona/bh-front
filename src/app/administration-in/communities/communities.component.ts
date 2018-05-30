import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { TeamsService } from "../../services/teams/teams.service";

@Component({
	selector: "app-communities",
	templateUrl: "./communities.component.html",
	styleUrls: ["./communities.component.scss"]
})
export class CommunitiesComponent implements OnInit {
	public page_name: string = "page_community";
	public communityShow: boolean = false;
	public userCommData: any;
	public img_avatar: string = "";
	constructor(
		public g: Globals,
		private router: Router,
		private auth: AuthserviceService,
		private tms: TeamsService
	) {
		this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
	}

	async ngOnInit() {
		try {
			let isAdmin = await this.auth.isAdminUser();
			if (isAdmin.status == "OK") {
				this.getCommunity();
			} else {
				this.router.navigateByUrl("/");
			}
		} catch (e) {}
	}

	async getCommunity() {
		try {
			let cUser: any = await this.tms.getCommunityData();
			if (cUser) {
				if (cUser.status == "OK") {
					this.userCommData = cUser.data.users;
					console.log(this.userCommData);
					this.communityShow = true;
				}
			}
		} catch (e) {}
	}
}

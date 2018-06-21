import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { BaseHttpService } from "../../services/base-http/base-http.service";
import { TeamsService } from "../../services/teams/teams.service";
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Headers } from '@angular/http';
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";
import { DealSpaceService } from "../../services/deal-space/deal-space.service";


@Component({
	selector: "app-communities",
	templateUrl: "./communities.component.html",
	styleUrls: ["./communities.component.scss"]
})

export class CommunitiesComponent implements OnInit {
	public communityShow: boolean = false;
	public userCommData: any;
	public img_avatar: string = "";
	private collablists: any;
	private headers: Headers;
	private bhttps: BaseHttpService;
	private activeCollabDiv: string;
	private user: any;
	private activeTab: string;

	constructor(
		public g: Globals,
		private router: Router,
		private auth: AuthserviceService,
		private tms: TeamsService,
		private httpClient: HttpClient,
		private colServ: DealSpaceService
	) {
		this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
		this.user = this.auth.getUser();
		console.log(this.user);

	}

	async ngOnInit() {
		try {
			let isAdmin = await this.auth.isAdminUser();
			if (isAdmin.status == "OK") {
				this.getCommunity();
				this.getCollabsList();
			} else {
				this.router.navigateByUrl("/");
			}
		} catch (e) {}
	}

	async getCommunity() {
		try {
			let cUser: any = await this.tms.getCommunityData();
			console.log(cUser);
			if (cUser) {
				if (cUser.status == "OK") {
					this.userCommData = cUser.data.users;
					//console.log("User : ");
					//console.log(this.user);
					//console.log(this.userCommData);
					this.communityShow = true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	async getCollabsList() {
		try {
			let cols: any = await this.colServ.getCollaborationsList();
			if (cols) {
				if (cols.status == "OK") {
					this.collablists = cols.data;
					console.log(this.collablists);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	public getCollabData(event, collab) {
		document.getElementById("title_collab").innerText = collab.name;
		if (this.activeCollabDiv != null)
			document.getElementById(this.activeCollabDiv).style.backgroundColor = "#F4F5F7";
		document.getElementById(collab._id).style.backgroundColor = "#FFFFFF";
		this.activeCollabDiv = collab._id;
		//alert(collab._id);
	}

	public changeTab (event, td) {
		if (this.activeTab != null)
			document.getElementById(this.activeTab).style.borderBottom = "solid 3px rgba(0,0,0,0)";
		document.getElementById(td).style.borderBottom = "solid 3px rgba(0,0,0,1)";
		this.activeTab = td;
	}

	public tabMouseEnter (id) {
		document.getElementById(id).style.borderBottom = "solid 3px rgba(0,0,0,1)";
	}

	public tabMouseLeave (id) {
		if (this.activeTab != null && this.activeTab == id) return true;
		document.getElementById(id).style.borderBottom = "solid 3px rgba(0,0,0,0)";
	}

}

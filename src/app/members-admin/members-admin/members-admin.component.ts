import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { TeamsService } from "../../services/teams/teams.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
	selector: "app-members-admin",
	templateUrl: "./members-admin.component.html",
	styleUrls: ["./members-admin.component.scss"]
})
export class MembersAdminComponent implements OnInit {
	public team_page: string = "team_page";
	public details: any;
	public img_avatar: string;
	public activated: boolean = false;
	public adminAll: boolean = true;
	public readyData: boolean = false;
	public communityShow: boolean = true;
	public userAdminData: any;
	public inviteForm: FormGroup;
	constructor(
		public g: Globals,
		private router: Router,
		private tms: TeamsService,
		private auth: AuthserviceService
	) {
		this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
		this.inviteForm = new FormGroup({
			lastname: new FormControl("", [Validators.required]),
			firstname: new FormControl("", [Validators.required]),
			invAsTeam: new FormControl(true),
			invAsComm: new FormControl(true),
			email: new FormControl("", [
				Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
				Validators.required
			])
		});
	}
	async ngOnInit() {
		try {
			let isAdmin = await this.auth.isAdminUser();
			if (isAdmin.status == "OK") {
				this.getProfile();
				this.getMember();
			} else {
				this.router.navigateByUrl("/");
			}
		} catch (e) {}
	}
	async getProfile() {
		try {
			let prdata: any = await this.auth.profile();
			if (prdata) {
				if (prdata.active) {
					this.activated = true;
					this.details = prdata;
					this.readyData = true;
					return prdata;
				} else {
					throw new Object({
						type: "NotActivate"
					});
				}
			}
		} catch (ee) {
			this.readyData = true;
			if ("type" in ee) {
				if (ee.type == "NotActivate") {
					this.activated = false;
				}
			} else {
				this.auth.logout();
			}
		}
	}
	gotoProfileEdit() {
		this.router.navigateByUrl("/Administration");
	}
	async submitinvite() {
		var data: any = this.inviteForm.value;
		var teamInviteRes: any = await this.tms.inviteTeam(data);
	}
	
	async getMember() {
		try {
			let team_data: any = await this.tms.getTeamData({});
			if (team_data) {
				this.userAdminData = team_data.data;
			}
		} catch (e) {
			console.log(e);
		}
	}

	async teamCommChange(ev, ent, it) {
		console.log(ent);
		try {
			let d: {
				[key: string]: any;
			} = {};
			if (ent == "tAdm") {
				d = {
					_id: it._id,
					value: !it.isAdm,
					reg: "adm"
				};
			} else if (ent == "comm") {
				d = {
					_id: it._id,
					value: !it.isComm,
					reg: "com"
				};
			}
			let r: any = await this.tms.changeRoleAdmin(d);
			if (r) {
				if (r.status == "OK") {
					console.log("Success");
					this.userAdminData = [];
					this.getMember();
				}
			}
		} catch (e) {}
	}
	async deleteFromTeamList(it) {
		try {
			let rm: any = await this.tms.deleteFromTeamList({ usr_id: it._id });
			if (rm) {
				if (rm.status == "OK") {
					this.userAdminData = [];
					this.getMember();
				}
			}
		} catch (e) {}
	}

	viewUsersTeams(scp) {
		switch (scp) {
			case "admin":
				this.adminAll = true;
				this.communityShow = false;
				break;
			case "community":
				this.adminAll = false;
				this.communityShow = true;
				break;
			default:
				// code...
				break;
		}
	}
}

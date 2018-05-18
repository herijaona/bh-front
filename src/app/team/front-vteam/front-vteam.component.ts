import { Component, OnInit, OnDestroy, Input, ElementRef } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { TeamsService } from "../../services/teams/teams.service";
import { AuthserviceService } from "../../services/authservice/authservice.service";

@Component({
	selector: "front-vteam",
	templateUrl: "./front-vteam.component.html",
	styleUrls: ["./front-vteam.component.scss"]
})
export class FrontVteamComponent implements OnInit, OnDestroy {
	@Input("vteamDATA")
	set vteamDATA(d) {
		this.teamVideoData = d;
	}
	public teamVideoData: { [key: string]: any } = {};
	public editPAGEstatus = false;
	public tmsDetails: any;
	public contentEditState = false;
	public readyDT: boolean = false;
	public im_poster: string = "";
	constructor(
		private auth: AuthserviceService,
		private el: ElementRef,
		private sh: SharedNotificationService,
		private tms: TeamsService
	) {
		this.sh.notifButton$.subscribe((st: any) => {
			if (st.no == "clck") {
				if (!st.state) {
					this.editPAGEstatus = false;
					this.contentEditState = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
	}
	ngOnInit() {
		if (this.teamVideoData) {
			this.im_poster = this.sh.getVideoImPoster(
				this.teamVideoData.id_video
			);
		}
		this.getTeamUsers();
	}
	tmVEdit() {
		this.sh.pushData({
			from: "tmVideoFront",
			action: "edit",
			data: this.teamVideoData
		});
	}
	async tmVDelete() {
		try {
			let deletionAction = await this.tms.deleteTmV(
				this.teamVideoData._id
			);
			if (deletionAction) {
				this.sh.pushData({
					from: "tmVideoFront",
					action: "refresh",
					message: "OK"
				});
				this.sh.notifToast({
					type: "success",
					message: "<p>Element Supprimé  avec success</p>"
				});
				this.el.nativeElement.remove();
			}
		} catch (e) {
			console.log(e);
		}
	}

	tmVShow() {
		this.sh.pushData({
			from: "tmVideoFront",
			action: "show",
			data: this.teamVideoData
		});
	}

	ngOnDestroy() {
		this.sh.pushData({});
	}

	ask_questions_toTeam(ev) {
		ev.preventDefault();
		console.log(this.teamVideoData);
		if (this.auth.isLoggedIn()) {
			this.sh.pushData({
				from: "askQuestions",
				message: "askquestions",
				data: {
					objectRef: "team_front",
					objectData: this.teamVideoData,
					dtls: this.tmsDetails
				}
			});
		} else {
			let afterdata = {
				objectRef: "team_front",
				objectData: this.teamVideoData,
				dtls: this.tmsDetails
			};
			this.sh.pushData({
				from: "loginModal",
				message: "askquestions",
				data: { after: afterdata, to: "askQuestions" }
			});
		}
	}

	async getTeamUsers() {
		try {
			let o = await this.tms.getUsersTeamsNameFn(
				this.teamVideoData["team_users"]
			);
			if (o) {
				if (o["status"] == "OK") {
					this.readyDT = true;
					this.tmsDetails = o["data"];
				}
			}
		} catch (e) {}
	}
}

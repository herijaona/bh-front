import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseHttpService } from "../base-http/base-http.service";
import { SharedNotificationService } from "../shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";

@Injectable()
export class TeamsService extends BaseHttpService {
	constructor(
		public http: HttpClient,
		public g: Globals,
		public sh: SharedNotificationService
	) {
		super(http, g, sh);
	}

	teamFrontSaveData(arg: any) {
		return this.fetch("post", "team_front_video", arg).toPromise();
	}

	teamFrontGetData(arg: any) {
		return this.fetch("get", "team_front_video", {
			company_slug: arg
		}).toPromise();
	}

	deleteTmV(arg) {
		return this.fetch("delete", "team_front_video", {
			tm_video_id: arg
		}).toPromise();
	}

	updatetmvData(arg) {
		return this.fetch("put", "team_front_video", arg).toPromise();
	}

	public inviteTeam(da) {
		return this.fetch("post", "invite-in-team", da).toPromise();
	}

	public getTeamUsers(slug) {
		return this.fetch("get", "teams-users", {
			company_slug: slug
		}).toPromise();
	}

	public getUsersTeamsNameFn(arg) {
		return this.fetch("get", "team-details", { id_user: arg }).toPromise();
	}
}

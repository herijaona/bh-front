import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseHttpService } from "../base-http/base-http.service";
import { Globals } from "./../../globals/globals";

@Injectable()
export class TeamsService extends BaseHttpService {
	constructor(public http: HttpClient, public g: Globals) {
		super(http, g);
	}

	teamFrontSaveData(arg: any) {
		return this.fetch("post", "team_front_video", arg).toPromise();
	}

	teamFrontGetData(arg: any) {
		return this.fetch("get", "team_front_video",{ company_slug: arg }).toPromise();
	}
}

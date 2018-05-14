import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SharedNotificationService } from "../shared-notification/shared-notification.service";
import { BaseHttpService } from "../base-http/base-http.service";
import { Globals } from "./../../globals/globals";

@Injectable()
export class ProjectsService extends BaseHttpService {
	constructor(public http: HttpClient, public g: Globals, public sh: SharedNotificationService) {
		super(http, g, sh);
	}

	saveNewsProject(arg) {
		return this.fetch("post", "bh-projects", arg).toPromise();
	}

	getCompanyProject(arg) {
		return this.fetch("get", "bh-projects", {
			company_slug: arg
		}).toPromise();
	}

	getProjectByID(arg) {
		return this.fetch("get", "getProjectbyID", { projectID: arg }).toPromise();
	}

	saveEditProject(arg) {
		return this.fetch("put", "bh-projects", arg ).toPromise();
	}
}

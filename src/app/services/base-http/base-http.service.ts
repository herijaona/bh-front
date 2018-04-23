import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";
import { Router } from "@angular/router";
import { UserDetails } from "../../models/user-detail.model";
import "rxjs/add/operator/map";
import { Globals } from "./../../globals/globals";

@Injectable()
export class BaseHttpService {
	private token: string;
	private endPointUrl: string;
	constructor(
		public http: HttpClient,
		public g: Globals
	) {
		this.endPointUrl = this.g.api_baseUrl;
	}

	public request(
		method: "post" | "get",
		resource: any,
		data?: any,
		withtoken?: any
	): Observable<any> {
		let base;

		if (method === "post") {
			/* Post method */
			if (withtoken) {
				base = this.http.post(this.endPointUrl + `/api/${resource}`, data, {
					headers: new HttpHeaders().append(
						"Authorization",
						"Bearer " + localStorage.getItem("bh-token")
					)
				});
			} else {
				base = this.http.post(this.endPointUrl + `/api/${resource}`, data);
			}
		} else {
			/* Get method */
			if (withtoken) {
				base = this.http.get(this.endPointUrl + `/api/${resource}`, {
					headers: new HttpHeaders().append(
						"Authorization",
						"Bearer " + localStorage.getItem("bh-token")
					)
				});
			} else {
				base = this.http.get(this.endPointUrl + `/api/${resource}`);
			}
		}

		const request = base.pipe(map(data => { return data}));

		return request;
	}
}

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
		type: any,
		data?: any,
		withtoken?: any
	): Observable<any> {
		let base;

		if (method === "post") {
			console.log(localStorage.getItem("bh-token"));
			/* Post method */
			if (withtoken) {
				base = this.http.post(this.endPointUrl + `/api/${type}`, data, {
					headers: new HttpHeaders().append(
						"Authorization",
						"Bearer " + localStorage.getItem("bh-token")
					)
				});
			} else {
				base = this.http.post(this.endPointUrl + `/api/${type}`, data);
			}
		} else {
			/* Get method */
			if (withtoken) {
				// code...
				console.log(localStorage.getItem("bh-token"));
				base = this.http.get(this.endPointUrl + `/api/${type}`, {
					headers: new HttpHeaders().append(
						"Authorization",
						"Bearer " + localStorage.getItem("bh-token")
					)
				});
			} else {
				base = this.http.get(this.endPointUrl + `/api/${type}`);
			}
		}

		const request = base.pipe(map(data => { return data}));

		return request;
	}
}

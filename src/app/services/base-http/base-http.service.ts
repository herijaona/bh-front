import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";
import { Router } from "@angular/router";
import { UserDetails } from "../../models/user-detail.model";
import { SharedNotificationService } from "../shared-notification/shared-notification.service";
import "rxjs/add/operator/map";
import { Globals } from "./../../globals/globals";

@Injectable()
export class BaseHttpService {
	private endPointUrl: string;
	private accId: string = "";
	constructor(
		public http: HttpClient,
		public g: Globals,
		public sh: SharedNotificationService
	) {
		this.endPointUrl = this.g.api_baseUrl;
		this.sh.busDataIn$.subscribe((st: any) => {
			switch (st.from) {
				case "editKeyGeneral":
					this.accId = st.data;
			}
		});
	}

	public fetch(
		method: string = "GET",
		resource: string = "",
		data_params: { [key: string]: any } = {},
		header: { [key: string]: string } = {}
	) {
		let _data: any;
		let url = this.endPointUrl + "/api/" + resource;
		_data = data_params;

		if (method == "get" && Object.keys(data_params).length > 0) {
			url += "?" + this.getFilters(data_params);
			_data = {};
		}

		if (this.accId != "") {
			header["X-Ccompany-Id"] = this.accId;
		}

		return this.http.request(method, url, {
			headers: new HttpHeaders(header),
			body: _data
		});
	}

	public getFilters(data_params: { [key: string]: string } = {}) {
		let filter: string = "";
		let index: number = 0;
		for (let key in data_params) {
			console.log(key);
			let ecomm = index ? "&" : "";
			filter += ecomm + key + "=" + data_params[key];
			index++;
		}
		return filter;
	}
}

import { Component, OnInit } from "@angular/core";
import { Globals } from "../../globals/globals";
import { ApiHttpService } from "../../services/api-http/api-http.service";
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";
import { CompanyService } from "../../services/company/company.service";

@Component({
	selector: "app-list-companies",
	templateUrl: "./list-companies.component.html",
	styleUrls: ["./list-companies.component.scss"]
})
export class ListCompaniesComponent implements OnInit {
	public companies_data = undefined;
	constructor(
		private cs: CompanyService,
		public g: Globals,
		private apiHttp: ApiHttpService,
		private sh: SharedNotificationService
	) {}

	ngOnInit() {
		this.getAllCompanies().then((d: any) => {
			var er = [];
			d.map(function(el) {
				er.push(el);
				return el;
			});
			this.companies_data = er;
			this.sh.runloader({ action: "hide" });
		});
	}

	getAllCompanies() {
		this.sh.runloader({ action: "show" });
		return new Promise((resolve, reject) => {
			this.cs.getAllCompanies().then(
				(data: any) => {
					resolve(data);
				},
				error => {
					console.log(error);
					alert(error.message);
				}
			);
		});
	}
}

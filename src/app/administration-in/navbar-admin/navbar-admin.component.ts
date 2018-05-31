import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";
import { CompanyService } from "../../services/company/company.service";

@Component({
	selector: "navbar-admin",
	templateUrl: "./navbar-admin.component.html",
	styleUrls: ["./navbar-admin.component.scss"]
})
export class NavbarAdminComponent implements OnInit {
	public show: boolean = false;
	public hide: boolean = false;
	public currentSlug : string = '';

	constructor(
		private cs: CompanyService,
		private router: Router,
		public g: Globals,
		public el: ElementRef
	) {
		this.getDataOnCompany();
	}

	ngOnInit() {}
	toggleCollapse() {
		this.el.nativeElement
			.querySelector(".mobil-top")
			.classList.toggle("toggle-in");
		this.el.nativeElement
			.querySelector(".mobil-top")
			.classList.replace("nav-link", "fy");
	}

	async getDataOnCompany() {
		let getRes = await this.cs.getMyCompanData();
		if (getRes) {
			if (getRes.hasOwnProperty("_slug")) {
				this.currentSlug = getRes["_slug"];
			}
		}
	}
}

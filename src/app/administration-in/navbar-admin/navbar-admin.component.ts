import { Component, OnInit, Input } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";
@Component({
	selector: "navbar-admin",
	templateUrl: "./navbar-admin.component.html",
	styleUrls: ["./navbar-admin.component.scss"]
})
export class NavbarAdminComponent implements OnInit {
	public page_name: string;
	public pName = {
		mydesk: false,
		collabor: false,
		community: false
	}
	@Input("p_name")
	set p_name(pn) {
		this.page_name = pn.split("_")[1];
		Object.keys(this.pName).forEach((val, i) => {
			if (val == this.page_name) {
				this.pName[val] = true;
			} else {
				this.pName[val] = false;
			}
		});
	}

	constructor(private router: Router, public g: Globals) {}

	ngOnInit() {
		Object.keys(this.pName)
	}
}

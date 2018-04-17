import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { Globals } from "./../../globals/globals";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
	public isAdmin : boolean = false;
	constructor(
		private router: Router,
		public auth: AuthserviceService,
		public g: Globals,
	) {}

	ngOnInit() {
		let user__ :any;
		if (this.auth.isLoggedIn()) {
			user__ = this.auth.getUser();
			if(user__)
			this.isAdmin = user__.isAdmin; 
		}

		
	}

	gotologin() {
		this.router.navigateByUrl("/login");
	}
	gotohome() {
		this.router.navigateByUrl("/");
	}
}

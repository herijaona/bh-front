import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
	public isAdmin : boolean = false;
	public accAdm : any;
	private subscr: Subscription;
	constructor(
		private router: Router,
		public auth: AuthserviceService,
		public g: Globals,
		private sh: SharedNotificationService
	) {
		this.subscr = this.sh.run_loader$.subscribe((mess: any) => {
			this.updateState();
		});
	}

	ngOnInit() {
		this.updateState();
	}

	updateState(){
		let user__ :any;
		if (this.auth.isLoggedIn()) {
			user__ = this.auth.getUser();
			if(user__)
			this.isAdmin = user__.isAdmin; 
			this.accAdm = user__.accountAdmin;
		}
	}

	gotologin() {
		this.router.navigateByUrl("/login");
	}
	gotohome() {
		this.router.navigateByUrl("/");
	}
}

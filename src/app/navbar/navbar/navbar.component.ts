import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
import {
	trigger,
	state,
	style,
	transition,
	animate,
	keyframes
} from "@angular/animations";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"],
	animations: [
		trigger("notifToast", [
			state(
				"notifOn",
				style({
					position: "fixed",
					top: "5px",
					width: "100%",
					"z-index": 8888,
					"text-align": "center"
				})
			),
			state(
				"notifOff",
				style({
					position: "fixed",
					top: "-150px",
					width: "100%",
					"z-index": 8888,
					"text-align": "center"
				})
			),
			transition("notifOff <=> notifOn", animate("500ms ease"))
		])
	]
})
export class NavbarComponent implements OnInit {
	public st: string = "notifOff";
	public isAdmin: boolean = false;
	public accAdm: any;
	private subscr: Subscription;
	public mess_notif: string;
	public toast: boolean = true;

	constructor(
		private router: Router,
		public auth: AuthserviceService,
		public g: Globals,
		private sh: SharedNotificationService
	) {
		this.sh.run_loader$.subscribe((mess: any) => {
			// this.updateState();
		});

		this.sh.notifToast$.subscribe((m: any) => {
			this.showToast(m);
		});

		this.sh.viewLoad$.subscribe((m: any) => {
			if (m.sc) {
				this.updateState();
			}
		});
	}

	ngOnInit() {
		this.updateState();
	}

	updateState() {
		let user__: any;
		setTimeout(() => {
			if (this.auth.isLoggedIn()) {
				user__ = this.auth.getUser();
				if (user__) {
					this.isAdmin = user__.isAdmin;
					this.accAdm = user__.accountAdmin;
				}
			}
		}, 1000);
	}

	showToast(dt) {
		if (dt.type) {
			// code...
			this.mess_notif = dt.message;
			this.toast = true;
			this.st = "notifOn";
			setTimeout(() => {
				this.st = "notifOff";
				setTimeout(() => {
					this.toast = false;
				}, 1000);
			}, 3000);
		}
	}
}

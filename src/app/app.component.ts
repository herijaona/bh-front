import { Component } from "@angular/core";
import { NavbarModule } from "./navbar/navbar.module";
import { Subscription } from "rxjs/Subscription";
import { SharedNotificationService } from "./services/shared-notification/shared-notification.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	title = "app";
	private subscr: Subscription;

	constructor(
		private sh: SharedNotificationService,
		public spinner: NgxSpinnerService
	) {
		this.subscr = this.sh.run_loader$.subscribe((mess: any) => {
			if (mess.action == "show") {
				this.spinner.show();
			} else if (mess.action == "hide") {
				this.spinner.hide();
			}
		});
	}
}

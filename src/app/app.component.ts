import { Component } from "@angular/core";
import { NavbarModule } from "./navbar/navbar.module";
import { Subscription } from "rxjs/Subscription";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { SharedNotificationService } from "./services/shared-notification/shared-notification.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	title = "app";
	private subscr: Subscription;

	constructor(
		private spinnerService: Ng4LoadingSpinnerService,
		private sh: SharedNotificationService
	) {
		this.subscr = this.sh.run_loader$.subscribe((mess: any) => {
			if (mess.action == "show") {
				this.spinnerService.show();
			} else if (mess.action == "hide") {
				this.spinnerService.hide();
			}
		});
	}
}

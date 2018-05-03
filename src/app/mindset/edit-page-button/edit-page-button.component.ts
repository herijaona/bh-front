import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyService } from "../../services/company/company.service";

@Component({
	selector: "edit-page-button",
	templateUrl: "./edit-page-button.component.html",
	styleUrls: ["./edit-page-button.component.scss"]
})
export class EditPageButtonComponent implements OnInit, OnDestroy {
	public button_text: string = "Edit";
	public edit_state: boolean = false;
	public isAdmin: boolean = false;
	public currentCompanySlug: string = "";

	constructor(
		private activRoute: ActivatedRoute,
		private cs : CompanyService,
		private auth: AuthserviceService,
		private sh: SharedNotificationService
	) {
		this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
			this.isAdm();
		});
	}

	ngOnInit() {}

	isAdm() {
		this.auth.isAdmin(this.currentCompanySlug).then((er: any) => {
			this.isAdmin = er;
			if (!er) {
				this.sh.setLocalEditState(0);
				this.sh.pageEditButton({ state: false, no:'clck' });
			}
		});
	}

	show_hideAllEdit() {
		if (this.edit_state) {
			this.sh.setLocalEditState(0);
			this.edit_state = false;
			this.button_text = "Edit";
			this.sh.pageEditButton({ state: false, no: "clck" });
		} else {
			this.sh.setLocalEditState(1);
			this.edit_state = true;
			this.button_text = "Leave Edit";
			this.sh.pageEditButton({ state: true, no: "clck" });
		}
	}

	ngOnDestroy() {    
    this.cs.removeMycompanyId();
    this.sh.pageEditButton({});
  }
}

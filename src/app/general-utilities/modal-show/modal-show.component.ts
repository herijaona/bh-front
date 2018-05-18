import { Component, OnInit, ViewChild } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { ModalDirective } from "angular-bootstrap-md";

@Component({
	selector: "modal-show",
	templateUrl: "./modal-show.component.html",
	styleUrls: ["./modal-show.component.scss"]
})
export class ModalShowComponent implements OnInit {
	@ViewChild("mdl_general") myModalGen: ModalDirective;
	public askquest_mdl: boolean = false;
	public lgin_mdl: boolean = false;
	public activeShow: boolean = false;
	constructor(private sh: SharedNotificationService) {
		this.sh.busDataIn$.subscribe((st: any) => {
			switch (st.from) {
				case "askQuestions":
					this.askQuestions(st);
					break;
				case "loginModal":
					this.loginModal(st);
					break;
			}
		});
	}
	public loginModal(arg) {
		this.activeShow = true;
		this.lgin_mdl = true;
		console.log(arg);
		setTimeout(() => {
			this.myModalGen.show();
		}, 330);
	}

	public askQuestions(arg) {
		console.log(arg);
		this.activeShow = true;
		this.askquest_mdl = true;
		setTimeout(() => {
			this.myModalGen.show();
		}, 330);
	}

	hiddedModal() {
		setTimeout(() => {
			this.lgin_mdl = false;
			this.askquest_mdl = false;
			this.activeShow = false;
		}, 500);
	}
	ngOnInit() {}
}

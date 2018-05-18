import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from "angular-bootstrap-md";

@Component({
	selector: "ask-questions",
	templateUrl: "./ask-questions.component.html",
	styleUrls: ["./ask-questions.component.scss"]
})
export class AskQuestionsComponent implements OnInit {
	@Input("data_")
	set data_(d) {
		this.currObj = d;
	}
	public currObj: any;
	public questionText: string;
	public charLength: number;
	public changeStatus: boolean = false;
	constructor(
		private sh: SharedNotificationService,
		private auth: AuthserviceService,
		public g: Globals
	) {

	}

	ngOnInit() {
		console.log(this.currObj)
	}
	loginProcess() {}
	askQuestion() {}
	onChangeEditor(t) {
		this.changeStatus = this.textLengthCheck(t);
		this.charLength = t.length;
	}

	textLengthCheck(txt) {
		console.log(txt.length);
		if (txt.length > 1500) {
			return false;
		}
		return true;
	}

	onReady($event) {}
	onEditorChange($event) {}
}

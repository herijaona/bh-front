import {
	Component,
	OnInit,
	ViewChild,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TeamsService } from "../../services/teams/teams.service";
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
	@Output() endMessage = new EventEmitter<{}>();
	public charLength: number;
	public changeStatus: boolean = false;
	constructor(
		private sh: SharedNotificationService,
		private auth: AuthserviceService,
		private tms: TeamsService,
		public g: Globals
	) {}

	ngOnInit() {
	}
	loginProcess() {}
	askQuestion() {}
	onChangeEditor(t) {
		this.changeStatus = this.textLengthCheck(t);
		this.charLength = t.length;
	}

	textLengthCheck(txt) {
		if (txt.length > 10000) {
			return false;
		}
		return true;
	}

	async sendQuestions() {
		let _data_ = {
			objectRef: this.currObj.data.objectRef,
			objectRefID: this.currObj.data.objectData._id,
			question_content: this.questionText,
			dataAbout: {
				account: this.currObj.data.objectData.account
			}
		};

		try {
			let qRES = await this.tms.questionsSendData(_data_);
			if (qRES) {
				if (qRES["status"] == "OK") {
					this.sh.notifToast({
						type: "success",
						message: "<p>Your question is sent</p>"
					});
					this.endAll({ status: "OK", after: null, data: null });
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	endAll(status) {
		this.endMessage.emit(status);
	}
	onReady($event) {}
	onEditorChange($event) {}
}

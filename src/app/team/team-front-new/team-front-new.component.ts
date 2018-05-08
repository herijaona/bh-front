import { Component, OnInit, OnDestroy } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
	ValidateUrl,
	ValidateYear,
	ValidatePair
} from "../../services/validators/own.validator";
import { TeamsService } from "../../services/teams/teams.service";
@Component({
	selector: "team-front-new",
	templateUrl: "./team-front-new.component.html",
	styleUrls: ["./team-front-new.component.scss"]
})
export class TeamFrontNewComponent implements OnInit, OnDestroy {
	public teamVideoForm: FormGroup;
	public idVidYouTube: { [key: string]: string } = {};
	public im_poster: string;

	constructor(
		private tms: TeamsService,
		private sh: SharedNotificationService
	) {
		this.teamVideoForm = new FormGroup({
			tvCaption: new FormControl("", [Validators.required]),
			tvText: new FormControl("", [Validators.required]),
			tvVideoUrl: new FormControl("", [Validators.required, ValidateUrl])
		});
	}

	ngOnInit() {}

	urlSetted(ev) {
		let i_vi = this.getIdVideo(ev.target.value);
		if (!i_vi) {
			this.idVidYouTube = {};
		}
	}

	getIdVideo(r) {
		let video_id = "";
		if (!this.teamVideoForm.get("tvVideoUrl").errors) {
			video_id = r.split("v=")[1];
			let ampersandPosition = video_id.indexOf("&");
			if (ampersandPosition != -1) {
				video_id = video_id.substring(0, ampersandPosition);
			}
			console.log(video_id);
			this.idVidYouTube = {
				im_poster:
					"https://img.youtube.com/vi/" + video_id + "/hqdefault.jpg",
				id_video: video_id,
				video_url: r,
				iframe_:
					"<iframe src='https://www.youtube.com/embed/" +
					video_id +
					"?controls=1&autoplay=1'></iframe>"
			};
			this.im_poster = this.idVidYouTube.im_poster;
			return video_id;
		} else {
			console.log("url not valid");
		}
	}

	async saveTeamVideoFront() {
		try {
			let resp: any = await this.tms.teamFrontSaveData(this.idVidYouTube);
			console.log(resp)
			if (resp) {

				this.sh.pushData({ from: "tmodal_new", data: "end" });
				console.log(
					"firjiiiiiiiiiiiiiiiiiiiierrrrrrrrrrrrrrrrrrrjjjjjjjjjjjjjjjjeeeeeeeeeeeeiiiiiiiiiiiii"
				);
			}
		} catch (e) {}
	}

	ngOnDestroy() {
		this.sh.pushData({});
	}

	reussiAction() {}
}

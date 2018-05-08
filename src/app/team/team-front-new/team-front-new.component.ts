import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
	ValidateUrl,
	ValidateYear,
	ValidatePair
} from "../../services/validators/own.validator";

@Component({
	selector: "team-front-new",
	templateUrl: "./team-front-new.component.html",
	styleUrls: ["./team-front-new.component.scss"]
})
export class TeamFrontNewComponent implements OnInit {
	public teamVideoForm: FormGroup;
	public idVidYouTube: { [key: string]: string } = {};
	public im_poster: string;

	constructor() {
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
				i_v: video_id,
				im_url: r,
				i_frame: "ffe"
			};
			this.im_poster = this.idVidYouTube.im_poster;
			return video_id;
		} else {
			console.log("url not valid");
		}
	}
}

import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
import { Router, ActivatedRoute } from "@angular/router";
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
	public editorChanged: boolean = false;
	private toDoAction: string;
	private tmvDATA: any;
	private editAct: string = "tmVEdit";
	private addAct: string = "tmVAdd";
	public teamText: string;
	public currentCompanySlug: string;
	public team_person: any;
	public cketeamText: string = "...";

	@Input("do_action")
	set do_action(to_do: string) {
		this.toDoAction = to_do;
	}
	@Input("tmv_data")
	set tmv_data(tdta: any) {
		this.tmvDATA = tdta;
	}

	constructor(
		private activRoute: ActivatedRoute,
		private tms: TeamsService,
		private sh: SharedNotificationService,
		public g: Globals
	) {
		this.teamVideoForm = new FormGroup({
			tvCaption: new FormControl("", [Validators.required]),
			tvteamMember: new FormControl(0, [Validators.required]),
			tvVideoUrl: new FormControl("", [Validators.required, ValidateUrl])
		});

		this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
		});
	}

	async getallTeams() {
		try {
			let altM: any = await this.tms.getTeamUsers(
				this.currentCompanySlug
			);
			if (altM) {
				if ((altM.status = "OK")) {
					return altM.data;
				}
			}
		} catch (e) {}
	}
	ngOnInit() {
		this.getallTeams().then((dt: any) => {
			this.team_person = dt;
		});

		if (this.toDoAction == this.editAct) {
			this.teamVideoForm.setValue({
				tvCaption: this.tmvDATA.caption,
				tvteamMember: this.tmvDATA.team_users,
				tvVideoUrl: this.tmvDATA.video_url
			});
			this.cketeamText = this.tmvDATA.textTeam;
			this.im_poster = this.sh.getVideoImPoster(this.tmvDATA.id_video);
			this.editorChanged = true;
		} else if (this.toDoAction == this.addAct) {
			// code...
		}
	}

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
			this.im_poster = this.sh.getVideoImPoster(
				this.idVidYouTube.id_video
			);
			return video_id;
		}
	}
	public userNotSelected: boolean = false;

	onChangeTeamUsers() {}

	async saveTeamVideoFront() {
		if (this.teamVideoForm.value.tvteamMember == 0) {
			this.userNotSelected = true;
			return;
		} else {
			this.userNotSelected = false;
		}

		try {
			if (this.toDoAction == this.editAct) {
				if (
					this.teamVideoForm.value.tvCaption !=
						this.tmvDATA.caption ||
					this.cketeamText != this.tmvDATA.textTeam ||
					this.idVidYouTube.id_video != this.tmvDATA.id_video
				) {
					this.idVidYouTube[
						"caption"
					] = this.teamVideoForm.value.tvCaption;
					this.idVidYouTube[
						"team_users"
					] = this.teamVideoForm.value.tvteamMember;
					this.idVidYouTube["textTeam"] = this.cketeamText;

					let tmvUpdate: any = await this.tms.updatetmvData({
						id_: this.tmvDATA._id,
						data: this.idVidYouTube
					});
					if (tmvUpdate) {
						if (tmvUpdate.status == "OK") {
							// code...
							this.sh.pushData({
								from: "tmodal_new",
								data: "end"
							});
						}
					}
				}
			} else if (this.toDoAction == this.addAct) {
				this.idVidYouTube[
					"caption"
				] = this.teamVideoForm.value.tvCaption;
				this.idVidYouTube[
					"team_users"
				] = this.teamVideoForm.value.tvteamMember;
				this.idVidYouTube["textTeam"] = this.cketeamText;
				let resp: any = await this.tms.teamFrontSaveData(
					this.idVidYouTube
				);
				if (resp) {
					this.sh.pushData({ from: "tmodal_new", data: "end" });
				}
			}
		} catch (e) {}
	}

	ngOnDestroy() {
		this.sh.pushData({});
	}

	reussiAction() {}

	onEditorChange($event) {}
	onChangeEditor(e) {
		this.cketeamText = e;
		this.editorChanged = this.textLengthCheck(e);
	}

	textLengthCheck(txt) {
		let cnt: string = txt.replace(/\n/g, "").replace(/<(?:.|\n)*?>/gm, "");
		// this.charLength = cnt.length;
		if (cnt.length > 1000) {
			return false;
		}
		return true;
	}
	onChange(vent) {}
	onReady(vent) {}
}

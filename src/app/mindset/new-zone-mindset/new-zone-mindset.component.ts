import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { CompanyService } from "../../services/company/company.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import {
	ValidateUrl,
	ValidateYear,
	ValidatePair
} from "../../services/validators/own.validator";

@Component({
	selector: "new-zone-mindset",
	templateUrl: "./new-zone-mindset.component.html",
	styleUrls: ["./new-zone-mindset.component.scss"]
})
export class NewZoneMindsetComponent implements OnInit, OnDestroy {
	@Input("existDtype") existDtype: any;
	public currentCompanySlug: string = "";
	public selectedZone: string = "imAdd";
	private newDestFile = "newZone_im";
	private selectedIm: { [key: string]: string } = {};
	public imForm: FormGroup;
	public chrForm: FormGroup;
	public vidForm: FormGroup;
	public imNotSelected: boolean = true;
	public selctFlag: { [key: string]: boolean } = {
		imAdd: true,
		vidAdd: false,
		chiffrAdd: false,
		tweetAdd: false,
		fbAdd: false,
		txtAdd: false,
		mapAdrAdd: false
	};

	public idVidYouTube: { [key: string]: string } = {};
	public dtypeAddable: { [key: string]: boolean } = {};

	public imCaption: string = "";

	constructor(
		public g: Globals,
		private auth: AuthserviceService,
		private sh: SharedNotificationService,
		private activRoute: ActivatedRoute,
		private cs: CompanyService
	) {
		this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
			if (this.currentCompanySlug) {
				this.getCurrentCompanyZoneList(this.currentCompanySlug);
			}
		});

		this.imForm = new FormGroup({
			imCaption: new FormControl("", [
				Validators.required,
				Validators.maxLength(50)
			])
		});

		this.chrForm = new FormGroup({
			createdYear: new FormControl("", [ValidateYear]),
			ageMoyen: new FormControl(""),
			collabor: new FormControl(""),
			createdOpportinuite: new FormControl(""),
			turnOver: new FormControl(""),
			pariteFemme: new FormControl("", [ValidatePair]),
			pariteHomme: new FormControl("", [ValidatePair])
		});

		this.vidForm = new FormGroup({
			vidCaption: new FormControl("", [
				Validators.required,
				Validators.maxLength(100)
			]),
			vidYoutubeUrl: new FormControl("", [
				Validators.required,
				Validators.maxLength(100),
				ValidateUrl
			])
		});
	}

	ngOnInit() {
		this.sh.im_Selected$.subscribe((st: any) => {
			if (st.select) {
				if (st.destFile == this.newDestFile) {
					this.selectedIm = st.data;
					this.imNotSelected = false;
				}
			}
		});
	}

	inArray(needle, haystack) {
		var length = haystack.length;
		for (var i = 0; i < length; i++) {
			if (haystack[i] == needle) return true;
		}
		return false;
	}
	
	async getCurrentCompanyZoneList(sl_) {}

	zoneSelectChange(evt) {
		Object.keys(this.selctFlag).forEach(k => {
			if (k == evt.target.value) {
				this.selctFlag[k] = true;
			} else {
				this.selctFlag[k] = false;
			}
			this.imNotSelected = true;
		});
	}

	saveZone(ty_) {
		if (ty_ == "images") {
			this.saveImageZone();
		} else if (ty_ == "videos") {
			this.saveVideosZone();
		} else if (ty_ == "chiffres") {
			this.saveChiffresZone();
		}
	}
	saveChiffresZone() {
		let data_ = this.chrForm.value;
		let data = {
			caption: this.currentCompanySlug + "_chiffres",
			media_type: 3,
			data_suppl: JSON.stringify(data_)
		};
		this.apiSave(data).then(e => {
			this.saveFinished();
		});
	}
	saveImageZone() {
		let data = {
			caption: this.imForm.value.imCaption,
			media_id: this.selectedIm._id,
			media_type: 1
		};
		this.apiSave(data).then(e => {
			this.saveFinished();
		});
	}

	async apiSave(d): Promise<any> {
		try {
			let api_save = await this.cs.saveZoneData(d);
			console.log(api_save);
			if (api_save) {
				this.sh.notifToast({
					type: "success",
					message: "<p>Configuration saved</p>"
				});
				return api_save;
			}
		} catch (e) {}
	}

	saveFinished() {
		this.sh.pushData({ from: "modal_new", data: "end" });
	}

	urlSetted(ev) {
		let i_vi = this.getIdVideo(ev.target.value);
		if (!i_vi) {
			this.idVidYouTube = {};
		}
	}

	getIdVideo(r) {
		let video_id = "";
		if (!this.vidForm.get("vidYoutubeUrl").errors) {
			video_id = r.split("v=")[1];
			let ampersandPosition = video_id.indexOf("&");
			if (ampersandPosition != -1) {
				video_id = video_id.substring(0, ampersandPosition);
			}
			console.log(video_id);
			this.idVidYouTube = {
				im_poster: "https://img.youtube.com/vi/" + video_id + "/hqdefault.jpg",
				i_v: video_id,
				im_url: r
			};
			return video_id;
		} else {
			console.log("url not valid");
		}
	}

	async saveVideosZone() {
		this.getIdVideo(this.vidForm.value.vidYoutubeUrl);
		let dataVideo = {
			name: this.vidForm.value.vidCaption,
			url: JSON.stringify(this.idVidYouTube),
			acc_owner: this.cs.getMycompanyId(),
			hosted: false
		};
		try {
			let res_save_vid = await this.cs.saveNoHostedVideo(dataVideo);
			if (res_save_vid) {
				let data = {
					caption: this.vidForm.value.vidCaption,
					media_id: res_save_vid["data"]._id,
					media_type: 2
				};
				this.apiSave(data).then(e => {
					this.saveFinished();
				});
			}
		} catch (e) {}
	}

	ngOnDestroy() {
		this.sh.pushData({});
	}
}

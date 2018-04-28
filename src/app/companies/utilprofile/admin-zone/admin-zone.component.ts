import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Input, ElementRef, OnDestroy } from "@angular/core";
import { SharedNotificationService } from "../../../services/shared-notification/shared-notification.service";
import { ApiHttpService } from "../../../services/api-http/api-http.service";
import { CompanyService } from "../../../services/company/company.service";

@Component({
	selector: "admin-zone",
	templateUrl: "./admin-zone.component.html",
	styleUrls: ["./admin-zone.component.scss"]
})
export class AdminZoneComponent implements OnInit {
	@Input("actionType") actType;
	@Input("data") dataValue;
	public hasBiblioImage: boolean = false;
	public bbIm: any;
	public bbVid: any;
	public buttIm = false;
	public typeChanged_ = false;
	public selectedStatusId;
	public zoneForm: FormGroup;
	public typeVideo: boolean = false;
	public typeImage: boolean = false;
	public hasBiblioVideo: boolean = false;
	public currMedia: any = {};
	public selectedMediaF: boolean = false;
	public chVideo: boolean = true;

	constructor(
		private cs: CompanyService,
		private apiHttp: ApiHttpService,
		private sh: SharedNotificationService,
		private el: ElementRef
	) {}

	ngOnInit() {
		console.log(this.actType);
		this.zoneForm = new FormGroup({
			zName: new FormControl("", [Validators.required]),
			zHeight: new FormControl("", [Validators.required]),
			zWidth: new FormControl("", [Validators.required]),
			zType: new FormControl("", [Validators.required])
		});
	}

	upImChanged(event, id) {
		/*let label : HTMLInputElement = this.el.nativeElement.querySelector(
            ".selectedFile"
        );*/

		let inpt: HTMLInputElement = this.el.nativeElement.querySelector(
			"#" + id
		);
		var label = inpt.nextElementSibling;
		console.log(inpt);

		var labelVal = "Error";

		var fileName = "";
		if (inpt.files && inpt.files.length > 1)
			fileName = inpt.files.length.toString() + " selected";
		else fileName = event.target.value.split("\\").pop();

		if (fileName) label.querySelector("span").innerHTML = fileName;
		else label.innerHTML = labelVal;
		this.buttIm = true;
	}

	imBiblioShow(dt) {
		this.cs.getImBiblio(dt).subscribe((e: any) => {
			console.log(e);
			if (e) {
				if (dt == "images") {
					this.hasBiblioVideo = false;
					this.hasBiblioImage = true;
					this.bbIm = e.allIm;
				} else {
					this.hasBiblioImage = false;
					this.hasBiblioVideo = true;
					this.bbVid = e.allIm;
				}
			}
		});
	}

	/*this.imBiblioShow();*/

	uploadImageInBiblio(evtn, id, tp) {
		let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
			"#" + id
		);

		let fileCount: number = inputEl.files.length;

		let formData = new FormData();

		let promise = new Promise((resolve, reject) => {
			if (fileCount == 0) {
				resolve({
					status: 0,
					data: null
				});
			} else {
				this.sh.runloader({
					action: "show"
				});
				for (var i_ = 0; i_ < fileCount; ++i_) {
					formData.append(
						"biblio[]",
						inputEl.files.item(i_),
						inputEl.files.item(i_).name
					);
				}

				this.apiHttp
					.postUpMImages(formData, tp)
					.toPromise()
					.then((resp: any) => {
						this.sh.runloader({
							action: "hide"
						});
						if (resp.status == "OK") {
							resolve({
								status: 1,
								data: resp
							});
						}
					});
			}
		});

		promise.then((ert: any) => {
			console.log(ert);
			this.cs
				.updateCompanyImages({
					all_im: ert.data.imUP,
					acc_id: this.cs.getMycompanyId(),
					ty_pe: tp
				})
				.subscribe((de: any) => {
					this.sh.notifToast({
						type: "success",
						message: "<p>Configuration saved</p>"
					});
					inputEl.value = "";
					this.buttIm = false;
					this.imBiblioShow(tp);
				});
		});
	}
	ngOnDestroy() {
		console.log("i'm destroyed");
	}

	changeTypeContent() {
		this.selectedMediaF = false;
		console.log(this.selectedStatusId);
		if (this.selectedStatusId == 1) {
			this.Imagetype();
			this.buttIm = false;
			this.typeVideo = false;
			this.typeImage = true;
		} else if (this.selectedStatusId == 2) {
			// code...
			this.Videostypes();
			this.buttIm = false;
			this.typeImage = false;
			this.typeVideo = true;
		} else {
			this.buttIm = false;
			this.typeImage = false;
			this.typeVideo = false;
		}
	}

	Imagetype() {
		this.typeChanged_ = true;
		this.imBiblioShow("images");
	}

	Videostypes() {
		this.imBiblioShow("videos");
		this.typeChanged_ = true;
	}

	upVideoChanged(event, idinput) {
		console.log(idinput);
	}

	uploadVideoInBiblio(evnt, id) {
		let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
			"#" + id
		);
	}

	selectedMedia(ev, it) {
		ev.preventDefault();
		this.chVideo = false;
		this.selectedMediaF = true;
		console.log(it);
		this.currMedia = it;
		setTimeout(() => {
			this.chVideo = true;
		}, 200);
	}

	saveZone() {
		let data = {
			name: this.zoneForm.value.zName,
			height: this.zoneForm.value.zHeight,
			width: this.zoneForm.value.zWidth,
			media_id: this.currMedia._id,
			media_type: this.zoneForm.value.zType
		};

		let savingZone = new Promise((resolve, reject) => {
			this.cs
				.saveZoneData(data)
				.toPromise()
				.then((ret: any) => {
					console.log(ret);
				});
		});
	}
}

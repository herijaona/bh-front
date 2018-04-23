import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CompanyService } from "../../../services/company/company.service";
import { ApiHttpService } from "../../../services/api-http/api-http.service";
import { Globals } from "./../../../globals/globals";
import {
	Router,
	ActivatedRoute,
	Event,
	NavigationStart,
	ResolveStart,
	NavigationEnd,
	ResolveEnd
} from "@angular/router";
import { SharedNotificationService } from "../../../services/shared-notification/shared-notification.service";

@Component({
	selector: "app-general",
	templateUrl: "./general.component.html",
	styleUrls: ["./general.component.scss"]
})
export class GeneralComponent implements OnInit, OnDestroy {
	public uform: FormGroup;
	public im: string;
	public timeWait: number;
	public imChange: boolean = false;

	constructor(
		private cs: CompanyService,
		public g: Globals,
		private apiHttp: ApiHttpService,
		private el: ElementRef,
		public sh: SharedNotificationService
	) {
		if (this.cs.genVueFlag(true)) {
			this.timeWait = 0;
		} else {
			this.cs.genVueFlag(false, 0);
			this.timeWait = 1000;
		}
		this.im = g.base_href + "assets/img/logo2.png";
		this.uform = new FormGroup({
			_acc_commercial: new FormControl("", [Validators.required]),
			_acc_socialMean: new FormControl("", [Validators.required]),
			_orgType: new FormControl("", [Validators.required])
		});
	}

	ngOnInit() {
		if (!this.cs.isCDataId()) {
			this.sh.notifDataUnvaliable({});
		} else {
			if (!this.cs.isCDataStored) {
				this.getNupdtadeLocal();
			} else {
				this.showData();
			}
		}
	}
	/* Show and update  Data on the View*/
	showData() {
		let ww = this.timeWait;
		setTimeout(() => {
			let AccData: any = this.cs.getLocalCData();
			this.im = AccData.Logo;
			this.uform.setValue({
				_acc_commercial: AccData.enseigneCommerciale,
				_acc_socialMean: AccData.raisonSociale,
				_orgType: AccData.typeOrganisation
			});
		}, ww);
	}

	/* Handle Company Update Data Info*/
	onUpdateFormSubmit() {
		var cr = {
			raisonSociale: this.uform.value._acc_socialMean,
			enseigneCommerciale: this.uform.value._acc_commercial,
			typeOrganisation: this.uform.value._orgType,
			acc_id: localStorage.getItem("my_company")
		};
		this.cs.updateFormInfo(cr).subscribe((resp: any) => {
			this.cs.setDataC(resp);
			this.sh.notifToast({
				type: "success",
				message: "<p>Mis a jour Reussi</p>"
			});
			this.sh.notifyUpdateView({});
		});
	}
	/* Show selected image on the view*/
	readUrl(event: any) {
		let lastIm = this.im;
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();

			reader.onload = (event: any) => {
				this.im = event.target.result;
				if (this.im != lastIm) {
					this.imChange = true;
				}
			};

			reader.readAsDataURL(event.target.files[0]);
		}
	}

	imLogoSubmit() {
		let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
			"#_imLog"
		);

		this.apiHttp.formImUpload(inputEl).then((re: any) => {
			console.log("Havako o");
			console.log(re);
			if (re.data.status == "OK") {
				let upIm = this.cs.updateLogoImage({
					IdIm: re.data.imID,
					acc_id: this.cs.getMycompanyId()
				});
				upIm.then((e: any) => {
					this.sh.notifToast({
						type: "success",
						message: "<p>IMage mis a jour</p>"
					});
					this.getNupdtadeLocal();
				});
			}
		});
	}

	getNupdtadeLocal() {
		this.cs
			.getCurrentAdminCompanyInfo(this.cs.getMycompanyId(), true)
			.then((cd: any) => {
				this.sh.notifyUpdateView({});
				this.showData();
			});
	}

	ngOnDestroy() {
		console.log("Destroy General");
	}
}

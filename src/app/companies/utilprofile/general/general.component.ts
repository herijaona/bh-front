import {
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation,
	ViewChild,
	ElementRef
} from "@angular/core";
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
import { ModalDirective } from "angular-bootstrap-md";

@Component({
	selector: "app-general",
	encapsulation: ViewEncapsulation.None,
	templateUrl: "./general.component.html",
	styleUrls: ["./general.component.scss"]
})
export class GeneralComponent implements OnInit, OnDestroy {
	public editor;
	public editorContent = ``;
	public editorOptions = {
		placeholder: "insert content..."
	};
	public uform: FormGroup;
	public pform: FormGroup;
	public im = { i: "", s: false };
	public imC = { i: "", s: false };
	public timeWait: number;
	public imChange: boolean = false;
	public userSettings: any = {
		showSearchButton: false,
		showRecentSearch: false,
		showCurrentLocation: false
	};

	public prCurrentvalue = "";
	public prButtActive: boolean = false;
	@ViewChild("form") myModal: ModalDirective;
	public modalData: boolean = false;
	public typeChanged_: boolean = false;
	public otherInfoCurr: string = "";
	public othInfo = "";
	public prAfterChangeValue: string = "";
	public hZone : any ;

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
		this.im.i = g.base_href + "assets/img/logo2.png";
		this.imC.i = g.base_href + "assets/img/logo2.png";
		this.pform = new FormGroup({
			pMindset: new FormControl(false),
			pTeam: new FormControl(false),
			pSs: new FormControl(false),
			pIdeas: new FormControl(false),
			pProjects: new FormControl(false)
		});
		this.uform = new FormGroup({
			_acc_commercial: new FormControl("", [Validators.required]),
			_acc_socialMean: new FormControl("", [Validators.required]),
			_orgType: new FormControl("", [Validators.required])
		});

		this.sh.readyData$.subscribe((e: any) => {
			this.showData();
		});
	}

	ngOnInit() {
		if (!this.cs.isCDataId()) {
			// this.sh.notifDataUnvaliable({});
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
			this.im.i = AccData.Logo;
			if (AccData.coverImage) {
				this.imC.i = AccData.coverImage;
			}
			this.uform.setValue({
				_acc_commercial: AccData.enseigneCommerciale,
				_acc_socialMean: AccData.raisonSociale,
				_orgType: AccData.typeOrganisation
			});
			if (AccData.pagetoShow) {
				let pConfig = JSON.parse(AccData.pagetoShow);
				this.pform.setValue({
					pMindset: pConfig.pMindset,
					pTeam: pConfig.pTeam,
					pSs: pConfig.pSs,
					pIdeas: pConfig.pIdeas,
					pProjects: pConfig.pProjects
				});
			}

			this.showMindsetData();
		}, ww);
	}

	public showMindsetData() {
		let m = new Promise((resolve, reject) => {
			this.cs
				.getMindsetData()
				.toPromise()
				.then((res: any) => {
					if(res.presentation) {
						this.editorContent = res.presentation.description;
						this.prCurrentvalue = res.presentation.description;
						this.otherInfoCurr = res.presentation.autreDescription;
						this.othInfo = res.presentation.autreDescription;
					}

					this.hZone = res.zone;
				});
		});
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
		let inID = event.target.id;
		let lastIm = this[inID].i;

		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = (event: any) => {
				this[inID].i = event.target.result;
				if (this[inID].i != lastIm) {
					this[inID].s = true;
				}
			};

			reader.readAsDataURL(event.target.files[0]);
		}
	}

	imCIMSubmit(typeIM, idIN) {
		let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
			idIN
		);

		this.apiHttp.formImUpload(inputEl).then((re: any) => {
			if (re.data.status == "OK") {
				let upIm = this.cs.updateDataImage(
					re.data.imID,
					this.cs.getMycompanyId(),
					typeIM
				);
				upIm.then((e: any) => {
					this.sh.notifToast({
						type: "success",
						message: "<p>Image mis a jour</p>"
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

	autoCompleteCallback1($event) {}

	savePageshowConfig() {
		this.cs
			.updatePagetoShow({
				d: this.pform.value,
				acc_id: this.cs.getMycompanyId()
			})
			.then((r: any) => {
				if (r.status == "OK") {
					this.sh.notifToast({
						type: "success",
						message: "<p>Configuration saved</p>"
					});
					return;
				}
			})
			.then(() => {
				this.cs.getCurrentAdminCompanyInfo(
					this.cs.getMycompanyId(),
					true
				);
			});
	}

	onEditorContentChanged(e, f) {
		if (f == "pr1") {
			this.prAfterChangeValue = e.html;
		}
		if (
			this.prCurrentvalue != this.prAfterChangeValue ||
			this.otherInfoCurr != this.othInfo
		) {
			this.prButtActive = true;
		} else {
			this.prButtActive = false;
		}
	}

	popModal() {
		this.myModal.show();
	}

	editZone() {
		this.myModal.show();
	}

	newZoneAdd() {
		this.modalData = true;
		this.myModal.show();
	}

	hideZoneModal() {
		this.modalData = false;
		this.myModal.hide();
	}

	public savePrChange() {
		let dt = {
			description: this.prAfterChangeValue,
			autreDescription: this.othInfo
		};

		let e = new Promise((resolve, reject) => {
			this.cs
				.savePrData(dt)
				.toPromise()
				.then((res: any) => {
					this.sh.notifToast({
						type: "success",
						message: "<p>Enregistree</p>"
					});
					this.getNupdtadeLocal();
					resolve();
				});
		});
	}

	ngOnDestroy() {}
}

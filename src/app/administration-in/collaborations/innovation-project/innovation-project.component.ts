import {
	Component,
	OnInit,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectsService } from "../../../services/projects/projects.service";
import { SharedNotificationService } from "./../../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../../globals/globals";
declare const CKEDITOR: any;

@Component({
	selector: "innovation-project",
	templateUrl: "./innovation-project.component.html",
	styleUrls: ["./innovation-project.component.scss"]
})
export class InnovationProjectComponent implements OnInit, OnDestroy {
	public prModel: { [key: string]: any } = {
		pr_contexte_ProjectEditor: "",
		pr_objectif_ProjectEditor: "",
		pr_elementProposition_ProjectEditor: "",
		pr_name: "",
		pr_responseTimeUnit: "",
		pr_responseTimeValue: ""
	};

	public cPrModel = {
		pr_dataConfidential: "",
		pr_confidentialExistData: "",
		pr_collabDurationType: "",
		pr_diffusionPlaces: "default"
	};
	public buttSaveErr: { [key: string]: boolean } = {
		pr_contexte_ProjectEditor: false,
		pr_objectif_ProjectEditor: false,
		pr_elementProposition_ProjectEditor: false,
		pr_name: false,
		pr_responseTimeUnit: false,
		pr_responseTimeValue: false
	};
	public shDate: boolean = false;
	public shConfidential = false;

	public noValid: boolean = true;

	public todoAct: string;
	public accId: string;
	public dataCurr: any = {};
	public editAct: string = "EditAct";
	public addAct: string = "AddAct";
	public projform: FormGroup;
	public prData: any;
	@Input("todoAct_")
	set todoAct_(arg) {
		this.todoAct = arg;
	}
	@Input("prData_")
	set prData_(arg) {
		this.prData = arg;
	}

	public diffusionModelCountry: any = [];
	public diffusionModelContinent = {
		asia: false,
		america: false,
		africa: false,
		europa: false,
		oceania: false
	};

	public diffusionTypes = {
		country: false,
		continent: false,
		part: false
	};

	constructor(
		public g: Globals,
		private pr: ProjectsService,
		private sh: SharedNotificationService,
		private el: ElementRef
	) {
		this.sh.busDataIn$.subscribe((st: any) => {
			switch (st.from) {
				case "editKeyGeneral":
					this.accId = st.data;
			}
		});
	}

	ngOnInit() {
		this.todoAct = this.addAct;
		if (this.todoAct == this.editAct) {
			this.getDataProject();
		} else {
			this.getCountryList();
		}
	}
	public ListCo: any = [];
	async getCountryList() {
		try {
			let cListres = await this.pr.countryGet();
			if (cListres) {
				if (cListres["status"] == "OK") {
					this.ListCo = cListres["data"];
				}
			}
		} catch (e) {}
	}

	async getDataProject() {
		try {
			let prD: any = await this.pr.getProjectByID(this.prData._id);
			if (prD.status == "OK") {
				this.dataCurr = prD;
				Object.keys(this.prModel).forEach(el => {
					this.prModel[el] = prD.data[el.split("_")[1]];
				});
			}
		} catch (e) {
			console.log(e);
		}
	}

	async saveProjects() {
		console.log(this.prModel);
		console.log(this.cPrModel);

		let new_val: { [key: string]: any } = {};
		Object.keys(this.prModel).forEach(e => {
			new_val[e.split("_")[1]] = this.prModel[e];
		});
		let diffData: any;
		if (this.cPrModel.pr_diffusionPlaces == "continent") {
			diffData = this.diffusionModelContinent;
		} else if (this.cPrModel.pr_diffusionPlaces == "country") {
			diffData = this.diffusionModelCountry;
		} else if (this.cPrModel.pr_diffusionPlaces == "part") {
			diffData = [];
		}

		let dataInnovColab = {
			typeCollab: "INNOVCOLLAB",
			dataDetails: {
				collabDescribData: new_val,
				collabDurationType: this.cPrModel.pr_collabDurationType,
				collabDurationData: this.collabDateObject,
				hasInfoConfidential: this.cPrModel.pr_confidentialExistData,
				infoConfidentialData: this.cPrModel.pr_dataConfidential,
				diffusionTypes: this.cPrModel.pr_diffusionPlaces,
				diffusionDatas: diffData
			}
		};

		try {
			let save_res: any;
			if (this.todoAct == this.editAct) {
				let data = { edited: new_val, id_: this.prData._id };
				save_res = await this.pr.saveEditProject(data);
			} else {
				save_res = await this.pr.saveNewsProject(dataInnovColab);
			}

			if (save_res) {
				if (save_res.status == "OK") {
					this.sh.notifToast({
						type: "success",
						message: "<p>Configuration saved</p>"
					});
					this.sh.pushData({
						from: "projectNEW",
						action: "refresh",
						data: "end"
					});
					this.el.nativeElement.style.display = "none";
				}
			}
		} catch (e) {
			console.log(e);
		}
		/*
		try {
			let save_res: any;
			if (this.todoAct == this.editAct) {
				let data = { edited: new_val, id_: this.prData._id };
				save_res = await this.pr.saveEditProject(data);
			} else {
				save_res = await this.pr.saveNewsProject(new_val);
			}
			if (save_res) {
				if (save_res.status == "OK") {
					this.sh.notifToast({
						type: "success",
						message: "<p>Configuration saved</p>"
					});
					this.sh.pushData({
						from: "projectNEW",
						action: "refresh",
						data: "end"
					});
					this.el.nativeElement.style.display = "none";
				}
			}
		} catch (e) {}*/
	}
	onReady(vent) {
		if ("status" in this.dataCurr) {
			if (this.dataCurr["status"] == "OK") {
				Object.keys(this.prModel).forEach(el => {
					this.prModel[el] = this.dataCurr.data[el.split("_")[1]];
				});
			}
		}
	}

	onChange(event) {
		let tValid = [];
		Object.keys(this.prModel).forEach(e => {
			if (this.prModel[e] != null) {
				if (this.prModel[e].length == 0) {
					// code...
					this.buttSaveErr[e] = true;
				} else {
					this.buttSaveErr[e] = false;
				}
			} else {
				this.buttSaveErr[e] = true;
			}
		});

		let vl = Object.values(this.buttSaveErr);
		let iter = 0;
		for (let i of vl) {
			if (i) {
				// this.noValid = true;
				break;
			}
			++iter;
		}
		tValid["descr"] = iter == vl.length ? "NOK" : "OK";

		tValid["duration"] = "OK";
		let drtion = this.cPrModel.pr_collabDurationType;

		if (drtion == "programmed") {
			if (this.collabDateObject) {
				if (!this.collabDateObject["limitdate"]) {
					tValid["duration"] = "OK";
				} else {
					tValid["duration"] = "NOK";
				}
			}
		} else if (drtion == "continue") {
			tValid["duration"] = "NOK";
		}

		tValid["dataSecret"] = "OK";
		let scret = this.cPrModel.pr_confidentialExistData;
		if (scret == "yes") {
			if (this.cPrModel.pr_dataConfidential != "") {
				tValid["dataSecret"] = "NOK";
			}
		} else if (scret == "no") {
			tValid["dataSecret"] = "NOK";
		} else {
			tValid["dataSecret"] = "OK";
		}

		tValid["diffsion"] = "OK";
		let diffType = Object.keys(this.diffusionTypes);
		for (let r of diffType) {
			if (this.diffusionTypes[r]) {
				if (r == "continent") {
					let ct = Object.keys(this.diffusionModelContinent);
					for (let ctin of ct) {
						if (this.diffusionModelContinent[ctin]) {
							tValid["diffsion"] = "NOK";
							break;
						}
					}
				} else if (r == "country") {
					if (this.diffusionModelCountry.length) {
						tValid["diffsion"] = "NOK";
					}
				} else if (r == "part") {
					tValid["diffsion"] = "NOK";
				}
			}
		}

		this.noValid = !this.IsAllGood(tValid);
	}

	IsAllGood(tb: any): boolean {
		var obk = Object.keys(tb);
		for (var ext of obk) {
			if (tb[ext] == "OK") {
				return false;
			}
		}
		return true;
	}

	durationTypeCollaborationChange() {
		this.shDate =
			this.cPrModel.pr_collabDurationType == "programmed" ? true : false;
		if (!this.shDate) {
			this.collabDateObject = {};
		}
		this.onChange("e");
	}
	onEditorChange(vent) {}
	onBlur(vent) {}
	onFocus(vent) {}

	public collabDateObject: any;

	saveDate(event) {
		console.log(event);
		this.collabDateObject = event;
		this.onChange(event);
	}
	onConfidentialChange(event) {
		this.cPrModel.pr_confidentialExistData = event.target.value;
		this.shConfidential =
			this.cPrModel.pr_confidentialExistData == "yes" ? true : false;
		if (!this.shConfidential) {
			this.cPrModel.pr_dataConfidential = "";
		}
		this.onChange(event);
	}

	changeDiffusion(ev) {
		Object.keys(this.diffusionTypes).forEach(el => {
			if (ev.target.value == el) {
				this.diffusionTypes[el] = true;
			} else {
				this.diffusionTypes[el] = false;
			}
		});

		switch (ev.target.value) {
			case "continent":
				this.diffusionModelCountry = [];
				break;
			case "country":
				Object.keys(this.diffusionModelContinent).forEach(el => {
					this.diffusionModelContinent[el] = false;
				});
				break;
			case "part":
				break;
			default:
				break;
		}
		this.onChange("e");
	}

	selectCountryDIffusion() {
		this.onChange("e");
	}
	continentCh() {
		this.onChange("e");
	}
	ngOnDestroy() {
		this.sh.pushData({});
		/*for (let x in CKEDITOR.instances) {
			CKEDITOR.instances[x].destroy(true);
		}*/
	}
}

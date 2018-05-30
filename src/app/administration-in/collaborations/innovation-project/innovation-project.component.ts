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
		pr_responseTimeValue: "",
		pr_dataConfidential: "",
		pr_durationTypeCollab: "",
		confidentialData: "",
		diffusionPlaces: ""
	};
	shDate: boolean = false;
	public collabDate: { [key: string]: any } = {};
	public buttSaveErr: { [key: string]: boolean } = {
		pr_contexte_ProjectEditor: false,
		pr_objectif_ProjectEditor: false,
		pr_elementProposition_ProjectEditor: false,
		pr_name: false,
		pr_responseTimeUnit: false,
		pr_responseTimeValue: false
	};
	public todoAct: string;
	public accId: string;
	public shConfidential = false;
	public dataCurr: any = {};
	public noValid: boolean = true;
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

	public diffusionModel: { [key: string]: any } = {};

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
		if (this.todoAct == this.editAct) {
			this.getDataProject();
		}
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
		let new_val: { [key: string]: any } = {};
		Object.keys(this.prModel).forEach(e => {
			new_val[e.split("_")[1]] = this.prModel[e];
		});
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
		} catch (e) {}
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
				this.noValid = true;
				break;
			}
			++iter;
		}

		if (iter == vl.length) this.noValid = false;
	}
	durationTypeCollaborationChange() {
		this.shDate =
			this.prModel.durationTypeCollab == "programmed" ? true : false;
	}
	onEditorChange(vent) {}
	onBlur(vent) {}
	onFocus(vent) {}
	ngOnDestroy() {
		this.sh.pushData({});
		/*for (let x in CKEDITOR.instances) {
			CKEDITOR.instances[x].destroy(true);
		}*/
	}

	public collabDateObject: { [key: string]: any } = {};
	saveDate(event) {
		this.collabDateObject = event;
	}
	onConfidentialChange($event) {
		console.log(this.prModel);
		this.shConfidential =
			this.prModel.confidentialData == "yes" ? true : false;
	}

	changeDiffusion(){
		
	}
}

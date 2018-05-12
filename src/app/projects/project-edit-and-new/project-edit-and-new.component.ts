import { Component, OnInit, ElementRef, Input, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectsService } from "../../services/projects/projects.service";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";
declare const CKEDITOR: any;

@Component({
	selector: "project-edit-and-new",
	templateUrl: "./project-edit-and-new.component.html",
	styleUrls: ["./project-edit-and-new.component.scss"]
})
export class ProjectEditAndNewComponent implements OnInit, OnDestroy {
	public prModel: { [key: string]: any } = {
		pr_contexte_ProjectEditor: "",
		pr_objectif_ProjectEditor: "",
		pr_elementProposition_ProjectEditor: "",
		pr_name: "",
		pr_responseTimeUnit: "",
		pr_responseTimeValue: ""
	};

	public buttSaveErr: { [key: string]: boolean } = {
		pr_contexte_ProjectEditor: false,
		pr_objectif_ProjectEditor: false,
		pr_elementProposition_ProjectEditor: false,
		pr_name: false,
		pr_responseTimeUnit: false,
		pr_responseTimeValue: false
	};

	public todoAct: string;
	public noValid: boolean = true;
	public editAct: string = "EditAct";
	public addAct: string = "AddAct";
	public projform: FormGroup;
	public dataPROJ: any;
	@Input("to_do")
	set to_do(arg) {
		this.todoAct = arg;
	}
	@Input("projetData")
	set projetData(arg) {
		this.dataPROJ = arg;
	}

	constructor(
		public g: Globals,
		private pr: ProjectsService,
		private sh: SharedNotificationService,
		private el: ElementRef
	) {}
	ngOnInit() {
		if ((this.todoAct = this.addAct)) {
			// code...)
		}
	}

	async saveProjects() {
		let new_val: { [key: string]: any } = {};
		Object.keys(this.prModel).forEach(e => {
			new_val[e.split("_")[1]] = this.prModel[e];
		});
		try {
			let save_res: any = this.pr.saveNewsProject(new_val);
			if (save_res) {
				if (save_res.status == "OK") {
					this.sh.notifToast({
						type: "success",
						message: "<p>Configuration saved</p>"
					});
					this.el.nativeElement.style.display = "none";
					this.sh.pushData({
						from: "projects",
						action: "refresh",
						data: "end"
					});
				}
			}
		} catch (e) {}
	}
	onReady(vent) {}
	onChange(event) {
		Object.keys(this.prModel).forEach(e => {
			/*if (e == "prName") {
				if (event.target.classList.contains("prN")) {
					if (this.prModel[e].length == 0) {
						this.inptErr.prN = true;
					} else {
						this.inptErr.prN = true;
					}
				}
			}*/
			console.log(this.prModel[e]);
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
		console.log(this.buttSaveErr);
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
	onEditorChange(vent) {}
	onBlur(vent) {}
	onFocus(vent) {}
	ngOnDestroy() {
		this.sh.pushData({});
		for (let x in CKEDITOR.instances) {
        CKEDITOR.instances[x].destroy(true);
    }
	}
}

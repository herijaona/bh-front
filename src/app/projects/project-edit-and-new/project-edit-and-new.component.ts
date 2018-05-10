import { Component, OnInit, ElementRef } from "@angular/core";
import { Globals } from "./../../globals/globals";

@Component({
	selector: "app-project-edit-and-new",
	templateUrl: "./project-edit-and-new.component.html",
	styleUrls: ["./project-edit-and-new.component.scss"]
})
export class ProjectEditAndNewComponent implements OnInit {
	constructor(public g: Globals, private el: ElementRef) {}
	public contextProjectEditor: any;
	public objectivesProjectEditor: any;
	public proposalsRequirementEditor: any;

	ngOnInit() {}

	saveProjects() {
		this.el.nativeElement.remove();
	}
	onReady(vent) {}
	onChange(vent) {}
	onEditorChange(vent) {}
	onBlur(vent) {}
	onFocus(vent) {}
}

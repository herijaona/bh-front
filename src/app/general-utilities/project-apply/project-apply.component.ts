import { Component, OnInit, Input, EventEmitter,Output } from "@angular/core";

@Component({
	selector: "project-apply",
	templateUrl: "./project-apply.component.html",
	styleUrls: ["./project-apply.component.scss"]
})
export class ProjectApplyComponent implements OnInit {
	@Input("data_")
	set data_(d) {
		this.currObj = d;
	}
	public currObj: any;
	public questionText: string;
	@Output() endMessage = new EventEmitter<{}>();
	public charLength: number;
	public changeStatus: boolean = false;
	constructor() {}

	ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-view-reaction",
	templateUrl: "./view-reaction.component.html",
	styleUrls: ["./view-reaction.component.scss"]
})
export class ViewReactionComponent implements OnInit {
	public viewreaction_page: string = "viewreaction_page";
	constructor() {}

	ngOnInit() {}
}

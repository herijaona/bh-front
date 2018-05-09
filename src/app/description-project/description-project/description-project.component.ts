import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../globals/globals";

@Component({
	selector: "app-description-project",
	templateUrl: "./description-project.component.html",
	styleUrls: ["./description-project.component.scss"]
})
export class DescriptionProjectComponent implements OnInit {
	public projet_page: string = "projet_page";
	constructor(public g: Globals) {}

	ngOnInit() {}
}

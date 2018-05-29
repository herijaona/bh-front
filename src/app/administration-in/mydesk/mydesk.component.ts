import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../globals/globals";
@Component({
	selector: "app-mydesk",
	templateUrl: "./mydesk.component.html",
	styleUrls: ["./mydesk.component.scss"]
})
export class MydeskComponent implements OnInit {
	public page_name = "page_mydesk";
	constructor(public g: Globals) {}

	ngOnInit() {}
}

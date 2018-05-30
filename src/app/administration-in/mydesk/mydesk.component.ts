import { Component, OnInit, Input } from "@angular/core";
import { Globals } from "./../../globals/globals";
@Component({
	selector: "app-mydesk",
	templateUrl: "./mydesk.component.html",
	styleUrls: ["./mydesk.component.scss"]
})
export class MydeskComponent implements OnInit {	
	public page_name = "page_mydesk";
	@Input("pageCurrent")
	set pageCurrent(e) {
		this.pCurrent = e.split("_")[0];
		Object.keys(this.isactivePage).forEach((val, i) => {
			if (val == this.pCurrent) {
				this.isactivePage[val] = true;
			} else {
				this.isactivePage[val] = false;
			}
		});
	}
	public pCurrent: string;
	public isactivePage = {
		team: false,
		question: false
	};
	constructor(public g: Globals) {}

	ngOnInit() {}

}

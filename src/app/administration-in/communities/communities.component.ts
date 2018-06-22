import { Component, OnInit, ViewChild } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { TeamsService } from "../../services/teams/teams.service";
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
	selector: "app-communities",
	templateUrl: "./communities.component.html",
	styleUrls: ["./communities.component.scss"]
})
export class CommunitiesComponent implements OnInit {
	public img_a: string;
	@ViewChild('modalHist') public myModalHist: ModalDirective;
	constructor(
		public g: Globals) {
		this.img_a = this.g.base_href + 'assets/img/group.svg';
	}
	ngOnInit() {}

	public showMod(item) {
		setTimeout(() => {
		  this.myModalHist.show();
		}, 330);
	  }
	  public hideModal() {
		setTimeout(() => {
		  this.myModalHist.hide();
		}, 330);
	  }
}

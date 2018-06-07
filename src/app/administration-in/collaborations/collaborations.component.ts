import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { ProjectsService } from "../../services/projects/projects.service";
import { Router} from "@angular/router";

@Component({
	selector: "app-collaborations",
	templateUrl: "./collaborations.component.html",
	styleUrls: ["./collaborations.component.scss"]
})
export class CollaborationsComponent implements OnInit {
	constructor(
		public g: Globals,
		private pr: ProjectsService,
		private router: Router,
		public el: ElementRef,
		) {	}
	public collabTypes: any = [];
	ngOnInit() {
		this.getAllCollabT();
	}


	async getAllCollabT() {
		try {
			let allCT: any = await this.pr.getAllCollabTpes();
			if (allCT) {
				if (allCT.status == "OK") {
					console.log(allCT);
					this.collabTypes = allCT.data;
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	collablinks(){
		this.router.navigateByUrl('/login');
	}
	toggleCollapse2() {
		this.el.nativeElement
		  .querySelector(".ns")
		  .classList.toggle("ln");
		this.el.nativeElement
		  .querySelector(".float-r")
		  .classList.toggle("ln");
	  }
}

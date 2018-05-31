import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";

@Component({
	selector: "navbar-admin",
	templateUrl: "./navbar-admin.component.html",
	styleUrls: ["./navbar-admin.component.scss"]
})
export class NavbarAdminComponent implements OnInit {
	public show: boolean = false;
	public hide: boolean = false;

	constructor(private router: Router, public g: Globals, public el: ElementRef) {}

	ngOnInit() {
		
	}
	toggleCollapse() {
		this.el.nativeElement.querySelector(".mobil-top").classList.toggle("toggle-in");
	}

}

import { Component, OnInit } from "@angular/core";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { Router } from "@angular/router";
import { Globals } from './../../globals/globals';


@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
	constructor(private router: Router, public auth: AuthserviceService, public g : Globals ) {}

	ngOnInit() {}

	gotologin() {
		this.router.navigateByUrl("/login");
	}
	gotohome() {
		this.router.navigateByUrl("/");
	}
}

import { Component, OnInit } from "@angular/core";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
	constructor(private router: Router, public auth: AuthserviceService) {}

	ngOnInit() {}

	gotologin() {
		this.router.navigateByUrl("/login");
	}
	gotohome() {
		this.router.navigateByUrl("/");
	}
}

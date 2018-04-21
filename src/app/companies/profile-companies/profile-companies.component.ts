import { Component, OnInit } from "@angular/core";
import {
	Router,
	ActivatedRoute,
	Event,
	NavigationStart,
	ResolveStart,
	NavigationEnd,
	ResolveEnd
} from "@angular/router";
import { GeneralComponent } from "../utilprofile/general/general.component";
@Component({
	selector: "app-profile-companies",
	templateUrl: "./profile-companies.component.html",
	styleUrls: ["./profile-companies.component.scss"]
})
export class ProfileCompaniesComponent implements OnInit {
	public tabl = {
		general: false,
		job: false,
		event: false,
		user: false,
		projet: false
	};
	constructor(private route: ActivatedRoute, private router: Router) {
		this.route.params.subscribe((par: any) => {
			localStorage.setItem("my_company", par["_id"]);
		});

		router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				var urlAfterredirects = event.urlAfterRedirects
					.trim()
					.split("/");
				if (urlAfterredirects.length == 6) {
					var currtab = urlAfterredirects[5]
						.replace("(", "")
						.replace(")", "")
						.split(":");
					var rt = this.tabl;
					Object.keys(rt).forEach(function(key) {
						if (key === currtab[1]) {
							console.log("ok");
							rt[key] = true;
						} else {
							rt[key] = false;
						}
					});
					this.tabl = rt;
				} else {
					var rt = this.tabl;
					Object.keys(rt).forEach(function(key) {
						if (key == "general") {
							rt[key] = true;
						} else {
							rt[key] = false;
						}
					});
					this.tabl = rt;
				}
				// Show loading indicator
			}
		});
	}
	ngOnInit() {}
}

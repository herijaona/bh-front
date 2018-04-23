import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { CompanyService } from "../../services/company/company.service";
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../globals/globals";

@Component({
	selector: "app-profile-companies",
	templateUrl: "./profile-companies.component.html",
	styleUrls: ["./profile-companies.component.scss"]
})
export class ProfileCompaniesComponent implements OnInit, OnDestroy {
	public profilData = {
		img_: "",
		commName: "",
		r_s: "",
		adresse:''
	};

	public tabl = {
		general: false,
		job: false,
		event: false,
		user: false,
		projet: false
	};
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cs: CompanyService,
		public g: Globals,
		private sh: SharedNotificationService
	) {

		this.sh.ViewUpdateNotif$.subscribe((d)=>{
			this.showData(this.cs.getMycompanyId);
		});

		this.profilData.img_ = g.base_href + "assets/img/logo2.png";

		this.sh.notifCompany$.subscribe((d: any) => {
			if (d.data) {
				this.showData(this.cs.getMycompanyId(), true);
			}
		});
		var init_ = new Promise((resolve, reject) => {
			this.route.params.subscribe((par: any) => {
				this.cs.storeMycompanyId(par["_id"]);
				resolve(par["_id"]);
			});
		});

		init_.then((id: any) => {
			this.showData(id);
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

	showData(e, notif?) {

		this.cs.getCurrentAdminCompanyInfo(e).then(
			(dat: any) => {
				this.profilData.img_ = dat.Logo;
				this.profilData.commName = dat.enseigneCommerciale;
				this.profilData.r_s = dat.raisonSociale;
				this.profilData.adresse = dat.adresse;
			},
			err => {
			}
		);
	}
	ngOnInit() {}

	ngOnDestroy() {
		localStorage.removeItem("my_company");
		localStorage.removeItem("accCUR");
		this.cs.removeData();
	}
}

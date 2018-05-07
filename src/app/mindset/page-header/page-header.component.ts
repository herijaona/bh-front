import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyService } from "../../services/company/company.service";
import { Subscription } from "rxjs/Subscription";
import { ModalDirective } from "angular-bootstrap-md";
@Component({
	selector: "page-header",
	templateUrl: "./page-header.component.html",
	styleUrls: ["./page-header.component.scss"]
})
export class PageHeaderComponent implements OnInit, OnDestroy {
	private subscr: {
		[key: string]: Subscription;
	} = {};
	private logoDestFile = "logo_im";
	private coverDestFile = "cover_im";
	public company_name: string = "company_name";
	public company_logo: string = "company_logo";
	public company_cover: string = "company_cover";
	public company_nameEditMode: boolean = false;
	public currentCompanySlug: string = "";
	public _typeOrganisation: string = "----";
	public _addr: string = "----";
	public pagetoShow: any;
	public header_page_logo: string = this.g.base_href + "assets/img/logo2.png";
	public header_page_cover: string = "url(" +
		this.g.base_href +
		"assets/img/logo2.png" +
		")";
	public company_comm_name: string = "";
	public editPAGEstatus: boolean = false;
	public selectingImage: boolean = false;
	public logoItem: {
		[key: string]: string;
	} = {};
	public compDetails: {
		[key: string]: string;
	} = {};
	public coverItem: {
		[key: string]: string;
	} = {};
	@ViewChild("form") myModal: ModalDirective;
	public dest_file = "";
	constructor(
		public g: Globals,
		public sh: SharedNotificationService,
		private activRoute: ActivatedRoute,
		private cs: CompanyService,
		private router: Router
	) {
		this.subscr.actvR = this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
			if (this.currentCompanySlug) {
				this.getCurrentCompany(this.currentCompanySlug);
			} else {
				this.router.navigateByUrl("/");
			}
		});
	}
	ngOnInit() {
		// this.editPAGEstatus = false;
		this.subscr.notifB = this.sh.notifButton$.subscribe((st: any) => {
			if (st.no == "clck") {
				if (!st.state) {
					this.company_nameEditMode = false;
					this.editPAGEstatus = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
		this.subscr.imSelect = this.sh.im_Selected$.subscribe((st: any) => {
			if (st.select) {
				if (st.destFile == this.logoDestFile) {
					this.logoItem = st.data;
					this.header_page_logo = this.logoItem.url;
					console.log(this.logoItem);
				} else if (st.destFile == this.coverDestFile) {
					this.coverItem = st.data;
					this.header_page_cover = "url(" + st.data.url + ")";
				}
			}
		});
		this.subscr.editEv = this.sh.editEvent$.subscribe((arg_: any) => {
			if (arg_.section == this.company_name) {
				if (arg_.action == "edit") {
					this.editCompanyNameSection();
				} else if (arg_.action == "save") {
					this.saveCompanyNameSection();
				}
			} else if (arg_.section == this.company_logo) {
				if (arg_.action == "edit") {
					this.editCompanyLogo();
				} else if (arg_.action == "save") {
					this.saveCompanyLogo();
				}
			} else if (arg_.section == this.company_cover) {
				if (arg_.action == "edit") {
					this.editCompanyCover();
				} else if (arg_.action == "save") {
					this.saveCompanyCover();
				}
			}
		});
	}
	editCompanyLogo() {
		this.selectingImage = true;
		this.dest_file = this.logoDestFile;
		setTimeout(() => {
			this.myModal.show();
		}, 300);
	}

	editCompanyCover() {
		this.selectingImage = true;
		this.dest_file = this.coverDestFile;
		setTimeout(() => {
			this.myModal.show();
		}, 300);
	}

	hideImageModal() {
		this.myModal.hide();
		setTimeout(() => {
			this.selectingImage = false;
		}, 300);
	}

	saveCompanyLogo() {
		if (this.logoItem._id) {
			this.saveUpdateIm({ Logo: this.logoItem._id });
		}
	}

	async saveUpdateIm(arg: any) {
		try {
			let res_update = await this.cs.updateDataInfo(arg);
			if (res_update) {
				this.sh.notifToast({
					type: "success",
					message: "<p>Enregistree</p>"
				});
			}
			this.logoItem = {};
		} catch (e) {}
	}

	saveCompanyCover() {
		if (this.coverItem._id) {
			this.saveUpdateIm({ coverImage: this.coverItem._id });
		}
	}

	saveCompanyNameSection() {
		this.cs
			.updateDataInfo({
				enseigneCommerciale: this.company_comm_name
			})
			.then(
				(resp: any) => {
					this.sh.notifToast({
						type: "success",
						message: "<p>Enregistree</p>"
					});
					this.company_nameEditMode = false;
					setTimeout(() => {
						window.history.pushState(
							{
								pageTitle: this.company_comm_name
							},
							"",
							this.g.site_baseUrl +
								this.g.base_href +
								"/Open-innovation/" +
								resp._slug +
								"/Acceuil"
						);
					}, 3000);
				},
				err => {
					console.log(err.error);
				}
			);
	}
	editCompanyNameSection() {
		this.company_nameEditMode = true;
	}
	getCurrentCompany(slug_: string) {
		this.cs.getCompanyDetails(slug_).then(
			(rsp: any) => {
				this.pagetoShow = JSON.parse(rsp.pagetoShow);
				this.header_page_logo = rsp.Logo;
				if (rsp.coverImage) {
					// code...
					this.header_page_cover = "url(" + rsp.coverImage + ")";
				}
				this.company_comm_name = rsp.enseigneCommerciale;
				this.compDetails = rsp;
				this._typeOrganisation = rsp.typeOrganisation;
				this._addr = rsp.adresse;
			},
			err => {
				console.log(err);
				if (err.status == 404) {
					// code...
				}
			}
		);
	}
	ngOnDestroy() {
		Object.keys(this.subscr).forEach(e => {
			this.subscr[e].unsubscribe();
			console.log(e);
		});
		delete this.editPAGEstatus;
		delete this.sh;
	}
}

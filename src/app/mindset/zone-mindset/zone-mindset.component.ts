import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	HostListener
} from "@angular/core";
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyService } from "../../services/company/company.service";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { ModalDirective } from "angular-bootstrap-md";

@Component({
	selector: "zone-mindset",
	templateUrl: "./zone-mindset.component.html",
	styleUrls: ["./zone-mindset.component.scss"],
	host: {
		"(window:resize)": "onResize($event)"
	}
})
export class ZoneMindsetComponent implements OnInit {
	public stZone: boolean = false;
	public currentCompanySlug: string = "";
	public editPAGEstatus: boolean = false;
	private myWindth: number;
	@ViewChild("form") myModal: ModalDirective;
	public zoneEditState: boolean = false;
	public addNewState: boolean = false;
	public existDtype: any;
	public allZ: any;
	public allZ1: any;
	public chrDtype: any;
	public oneCol : number ;
	public twoCol :number;
	constructor(
		public g: Globals,
		private activRoute: ActivatedRoute,
		private auth: AuthserviceService,
		private sh: SharedNotificationService,
		private cs: CompanyService,
		private el: ElementRef
	) {
		this.activRoute.params.subscribe((params_: any) => {
			this.currentCompanySlug = params_["slug_acc"];
			this.formatDataView();
		});

		this.sh.notifButton$.subscribe((st: any) => {
			if (st.no == "clck") {
				if (!st.state) {
					this.editPAGEstatus = false;
					this.zoneEditState = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
		this.sh.busDataIn$.subscribe((st: any) => {
			if (st.from == "modal_new") {
				if (st.data == "end") {
					this.closeModalAddNEw();
				}
			}
		});
	}

	ngOnInit() {
		this.myWindth = this.el.nativeElement.parentElement.offsetWidth;
		this.oneCol = (this.myWindth-10)  / 3;
		this.twoCol = (this.myWindth-10)  * 2 / 3;
		console.log(this.myWindth);
	}

	onResize(event) {
		this.myWindth = this.el.nativeElement.parentElement.offsetWidth;
		this.oneCol = (this.myWindth-10) / 3;
		this.twoCol = (this.myWindth-10)  * 2 / 3;
	}

	async formatDataView() {
		try {
			let dtype = [];
			let all: any = await this.cs.allZoneData(this.currentCompanySlug);
			if (all) {
				let chrDtype: any;
				for (let z in all) {
					dtype.push(all[z].dtype);
					switch (all[z].dtype) {
						case 3:
							this.chrDtype = all[z];
							all.splice(z, 1);
							break;
						default:
							console.log(all[z].dtype);
							break;
					}
				}
				dtype = dtype.filter((elem, pos, arr) => {
					return arr.indexOf(elem) == pos;
				});
				this.allZ1 = all[0];
				all.splice(0, 1);
				this.existDtype = dtype;
				this.allZ = all;
				this.stZone = true;
				console.log(all);
			}
		} catch (e) {}
	}

	AddNew() {
		this.addNewState = true;

		setTimeout(() => {
			this.myModal.show();
		}, 400);
	}

	closeModalAddNEw() {
		this.myModal.hide();
		setTimeout(() => {
			this.addNewState = false;
		}, 330);
	}
}

import { Component, OnInit, Input, ElementRef, OnDestroy } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { CompanyService } from "../../services/company/company.service";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";

@Component({
	selector: "one-zone",
	templateUrl: "./one-zone.component.html",
	styleUrls: ["./one-zone.component.scss"]
})
export class OneZoneComponent implements OnInit, OnDestroy {
	private znWindth: number;
	private widthExp: number;
	private z_height: number;
	private currentInEdit: boolean = false;
	private canDeleted: boolean;
	private znSize: number;
	@Input("znWindth_")
	set znWindth_(zn: number) {
		this.znWindth = zn;
	}
	@Input("size_")
	set size_(znS: number) {
		this.znSize = znS;
		this.z_height = 100 * znS;
	}

	public editPAGEstatus: boolean = false;
	public oneZoneEditState: boolean = false;
	public zone_type: string = "image";
	public dtZone: { [key: string]: any };
	@Input("col_") column_in: number;

	@Input("dataZone")
	set dataZone(d) {
		this.dtZone = d;
		console.log(this.dtZone);
	}
	public in_col: number;
	public sm_col: number;
	constructor(
		public g: Globals,
		private el: ElementRef,
		private auth: AuthserviceService,
		private sh: SharedNotificationService,
		private cs: CompanyService
	) {
		this.sh.notifButton$.subscribe((st: any) => {
			this.in_col = 4 * this.column_in;
			if (this.column_in > 1) {
				this.sm_col = 12;
			} else {
				this.sm_col = 6;
			}
			if (st.no == "clck") {
				if (!st.state) {
					this.editPAGEstatus = false;
					this.oneZoneEditState = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
	}

	ngOnInit() {
		this.widthExp = (this.znWindth - 20) * this.znSize / 3;
		this.canDeleted = this.dtZone.canDeleted;
		if (this.dtZone.dtype == 2) {
			/*for local only */
			if (!this.dtZone.video.url.startsWith("uploads")) {
				this.dtZone.video.url = JSON.parse(this.dtZone.video.url);
			}
		} else if (this.dtZone.dtype == 3) {
			this.dtZone.data_suppl = JSON.parse(this.dtZone.data_suppl);
		}
	}

	async deleteZone() {
		try {
			let resDel = await this.cs.deleteZone(this.dtZone._id);
			if (resDel) {
				this.sh.notifToast({
					type: "success",
					message: "<p>Configuration saved</p>"
				});
				this.sh.pushData({
					from: "deleteZone",
					action: "notif",
					data: "success"
				});
			}
		} catch (e) {}
	}

	editZone() {
		this.currentInEdit = true;
		this.sh.pushData({ from: "editZone", data: this.dtZone });
	}

	ngOnDestroy() {
		this.sh.pushData({});
	}
}

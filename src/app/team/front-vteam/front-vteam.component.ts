import { Component, OnInit, OnDestroy, Input, ElementRef } from "@angular/core";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { TeamsService } from "../../services/teams/teams.service";

@Component({
	selector: "front-vteam",
	templateUrl: "./front-vteam.component.html",
	styleUrls: ["./front-vteam.component.scss"]
})
export class FrontVteamComponent implements OnInit, OnDestroy {
	@Input("vteamDATA")
	set vteamDATA(d) {
		this.teamVideoData = d;
	}

	public teamVideoData: { [key: string]: any } = {};
	public editPAGEstatus = false;
	public contentEditState = false;

	constructor(
		private el: ElementRef,
		private sh: SharedNotificationService,
		private tms: TeamsService
	) {
		this.sh.notifButton$.subscribe((st: any) => {
			if (st.no == "clck") {
				if (!st.state) {
					this.editPAGEstatus = false;
					this.contentEditState = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
	}
	ngOnInit() {}

	tmVEdit() {
		this.sh.pushData({
			from: "tmVideoFront",
			action: "edit",
			data: this.teamVideoData
		});
	}

	async tmVDelete() {
		try {
			let deletionAction = await this.tms.deleteTmV(this.teamVideoData._id);
			if (deletionAction) {
				this.sh.pushData({
					from: "tmVideoFront",
					action: "refresh",
					message: "OK"
				});
				this.sh.notifToast({
					type: "success",
					message: "<p>Element SupprimE avec success</p>"
				});
				this.el.nativeElement.remove();
			}
		} catch (e) {
			console.log(e);
		}
	}

	ngOnDestroy() {
		this.sh.pushData({});
	}
}

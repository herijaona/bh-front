import {
	Component,
	OnInit,
	ComponentFactoryResolver,
	ViewChild,
	ViewContainerRef
} from "@angular/core";
import { Globals } from "./../../globals/globals";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";
import { ProjectEditAndNewComponent } from "../project-edit-and-new/project-edit-and-new.component";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
	public projet_page = "projet_page";
	public editPAGEstatus: boolean = false;
	public ckeditorContent: any;
	@ViewChild("newRef", {
		read: ViewContainerRef
	})
	attachView: ViewContainerRef;

	constructor(
		public g: Globals,
		private componentFactoryResolver: ComponentFactoryResolver,
		private sh: SharedNotificationService
	) {
		this.sh.notifButton$.subscribe((st: any) => {
			if (st.no == "clck") {
				if (!st.state) {
					this.editPAGEstatus = false;
				} else {
					this.editPAGEstatus = true;
				}
			}
		});
	}

	ngOnInit() {}

	onChange($event: any): void {
		console.log("onChange");
		//this.log += new Date() + "<br />";
		console.log(this.ckeditorContent);
	}

	/* Show notification after registration */
	private create_new() {
		var factoryNotif = this.componentFactoryResolver.resolveComponentFactory(
			ProjectEditAndNewComponent
		);
		var refNotif = this.attachView.createComponent(factoryNotif);
		/*refNotif.instance.type = "success";
		refNotif.instance.message =
			"Compte creer avec succes <br> Consulter votre Boite email pour Activer votre compte.";
		*/
		// ref.changeDetectorRef.detectChanges();
	}
}

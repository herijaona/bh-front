import {
	Component,
	OnInit,
	OnDestroy,
	ViewChild,
	ComponentFactoryResolver,
	ViewContainerRef,
	ComponentRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiHttpService } from "../../services/api-http/api-http.service";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { NotifComponent } from "../notif/notif.component";
import { LoginComponent } from "../login/login.component";

@Component({
	selector: "app-activation",
	templateUrl: "./activation.component.html",
	styleUrls: ["./activation.component.scss"]
})
export class ActivationComponent implements OnInit, OnDestroy {
	private sub: any;
	private text_activation: string;
	@ViewChild("attachAll", { read: ViewContainerRef })
	attachView: ViewContainerRef;
	private refNotif;
	private refLogin;
	constructor(
		private route: ActivatedRoute,
		private apiHttp: ApiHttpService,
		private auth: AuthserviceService,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.text_activation = params["code"]; // (+) converts string 'id' to a number
			this.apiHttp
				.postReqActivation({ activation_code: this.text_activation })
				.subscribe(
					(resp: any) => {
						if (!this.auth.isLoggedIn()) {
							this.notifAndLogin(resp.message,'notif', true);
						} else {
							this.notifAndLogin(resp.message,'notif', false);
						}
					},
					err => {
						console.log(err);
						this.notifAndLogin('User Not Found','error', false);
					}
				);
		});
	}

	ngOnDestroy() {
		this.refNotif.destroy();
		this.refLogin.destroy();
	}

	private notifAndLogin(m,t, s) {
		console.log(this.attachView);
		var factoryNotif = this.componentFactoryResolver.resolveComponentFactory(
			NotifComponent
		);
		this.refNotif = this.attachView.createComponent(factoryNotif);
		this.refNotif.instance.type = "notif";
		this.refNotif.instance.message = m;

		if (s) {
			// code...
			var factoryLogin = this.componentFactoryResolver.resolveComponentFactory(
				LoginComponent
			);
			var refLogin = this.attachView.createComponent(factoryLogin);
		}

		// ref.changeDetectorRef.detectChanges();
	}
}

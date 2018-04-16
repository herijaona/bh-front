import {
	Component,
	OnInit,
	ElementRef,
	ViewChild,
	ComponentFactoryResolver,
	ViewContainerRef
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiHttpService } from "../../services/api-http/api-http.service";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { NotifComponent } from "../notif/notif.component";
import { LoginComponent } from "../login/login.component";
import { Router } from "@angular/router";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";

@Component({
	selector: "app-registration",
	templateUrl: "./registration.component.html",
	styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
	public registerForm: FormGroup;
	fileError: any = false;
	used_email: boolean = false;
	private form_el: ElementRef;
	@ViewChild("attachAll", { read: ViewContainerRef })
	attachView: ViewContainerRef;

	constructor(
		private el: ElementRef,
		private apiHttp: ApiHttpService,
		private auth: AuthserviceService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private router: Router,
		private sh: SharedNotificationService
	) {
		if (auth.isLoggedIn()) {
			this.router.navigateByUrl("/profile");
		}
	}

	ngOnInit() {

		this.registerForm = new FormGroup({
			bhemail: new FormControl("", [
				Validators.required,
				Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
			]),
			bh_pass: new FormControl("", [
				Validators.required,
				Validators.minLength(8)
			]),
			bh_pass_conf: new FormControl("", [
				Validators.required,
				Validators.minLength(8)
			]),
			bh_lastname: new FormControl("", [Validators.required]),
			bh_firstname: new FormControl("", [Validators.required]),
			bh_functions: new FormControl("", [Validators.required]),
			bh_acc_commercial: new FormControl("", [Validators.required]),
			bh_acc_socialMean: new FormControl("", [Validators.required]),
			bh_orgType: new FormControl("", [Validators.required]),
			bh_orgLocal: new FormControl("", [Validators.required])
		});
	}

	onFormSubmit() {
		let formEl: HTMLInputElement = this.el.nativeElement.querySelector(
			"#registerForm_"
		);
		var hasFile = this.formUpload();
		let credential = {
			email: this.registerForm.value.bhemail,
			lastname: this.registerForm.value.bh_lastname,
			firstname: this.registerForm.value.bh_firstname,
			password: this.registerForm.value.bh_pass,
			function: this.registerForm.value.bh_functions,
			enseigneCommerciale: this.registerForm.value.bh_acc_commercial,
			raisonSociale: this.registerForm.value.bh_acc_socialMean,
			Logo: "",
			typeOrganisation: this.registerForm.value.bh_orgType,
			adresse: this.registerForm.value.bh_orgLocal
		};

		hasFile.then((resFile: any) => {
			if (resFile.status == 0) {
				this.fileError = true;
			} else {
				credential.Logo = resFile.data.imID;

				this.sh.runloader({ action: "show" });
				this.auth.register(credential).subscribe(
					(r: any) => {
						// this.router.navigateByUrl("/profile");
						this.sh.runloader({ action: "hide" });
						formEl.remove();
						this.notifAndLogin();
					},
					err => {
						this.sh.runloader({ action: "hide" });
						if (err.status == 409) {
							this.used_email = true;
						}
					}
				);
			}
		});
	}

	formUpload() {
		// event.preventDefault();
		let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
			"#logoFile"
		);

		let imID: string;
		let fileCount: number = inputEl.files.length;
		let formData = new FormData();
		let promise = new Promise((resolve, reject) => {
			if (fileCount == 0) {
				resolve({ status: 0, data: null });
			} else {
				this.sh.runloader({ action: "show" });
				formData.append(
					"im_up",
					inputEl.files.item(0),
					inputEl.files.item(0).name
				);
				this.apiHttp
					.postUpImages(formData)
					.toPromise()
					.then((resp: any) => {
						this.sh.runloader({ action: "hide" });
						if (resp.status == "OK") {
							resolve({ status: 1, data: resp });
						}
					});
			}
		});

		return promise;
	}

	private notifAndLogin() {
		var factoryNotif = this.componentFactoryResolver.resolveComponentFactory(
			NotifComponent
		);
		var refNotif = this.attachView.createComponent(factoryNotif);
		refNotif.instance.type = "notif";
		refNotif.instance.message =
			"Compte creer avec succes <br> Consulter votre Boite email pour Activer votre compte.";

		var factoryLogin = this.componentFactoryResolver.resolveComponentFactory(
			LoginComponent
		);
		var refLogin = this.attachView.createComponent(factoryLogin);

		// ref.changeDetectorRef.detectChanges();
	}
}

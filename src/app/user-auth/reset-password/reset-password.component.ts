import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import * as CryptoJS from "crypto-js";
import { Globals } from "./../../globals/globals";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
	public resetpassForm: FormGroup;
	resetpassFormFlag: boolean = false;
	private id_reset: string;
	private resetCode: string;
	type_ = "notif";
	text_ = "Success de registration";
	error_log: boolean = false;
	constructor(
		private activ_route: ActivatedRoute,
		private auth: AuthserviceService,
		public g: Globals
	) {
		this.resetpassForm = new FormGroup({
			bh_pass: new FormControl("", [
				Validators.required,
				Validators.minLength(8)
			]),
			bh_pass_conf: new FormControl("", [
				Validators.required,
				Validators.minLength(8)
			])
		});
	}

	ngOnInit() {
		this.activ_route.params.subscribe(params => {
			this.id_reset = params["id_"];
			this.resetCode = params["pass_code"];
			this.auth
				.checkDataResetpass({
					id_data: this.id_reset,
					code_: this.resetCode
				})
				.subscribe(
					(ret: any) => {
						if (ret.status === "valid") {
							this.showNotif(ret.data, true, "secondary");
							this.resetpassFormFlag = true;
						} else if (ret.status == "no-valid") {
							this.showNotif(ret.data, true, "warning");
						}
					},
					error => {
						if (error.error.status == "NOK") {
							this.showNotif(error.error.data, true, "warning");
						}
					}
				);
		});
	}

	showNotif(txt, flag_ = false, type = "success") {
		this.text_ = txt;
		this.type_ = type;
		this.error_log = flag_;
		this.resetpassForm.reset();
	}

	resetpassFormSubmit() {
		var AfterSubmit = new Promise((resolve, reject) => {
			/*var key = CryptoJS.enc.Base64.parse(this.resetCode);
			var iv = CryptoJS.enc.Base64.parse(this.id_reset);

			var mdp_encrypted = CryptoJS.AES.encrypt(
				this.resetpassForm.value.bh_pass_conf,
				key,
				{ iv: iv }
			);
			// mdp_encrypted.toString()
			*/

			var data = {
				mdp_dump: this.resetpassForm.value.bh_pass_conf,
				id_data: this.id_reset,
				code_: this.resetCode
			};

			this.auth.submitNewPassword(data).subscribe(
				(state: any) => {
					if (state.status == "OK") {
						var txt =
							state.text +
							'<br> click <a href="' +
							this.g.base_href +
							'login" class="">ici</a> pour se connecter';
						this.showNotif(txt, true);
						this.resetpassFormFlag =false;
					}
				},
				error => {
					this.showNotif(
						"Un erreur est survenue lors du reinitialisation de votre mot de passe <br> Reessayer s'il vous plait",
						true,
						"warning"
					);
				}
			);
		});
	}
}

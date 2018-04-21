import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CompanyService } from "../../../services/company/company.service";
import { Globals } from "./../../../globals/globals";

@Component({
	selector: "app-general",
	templateUrl: "./general.component.html",
	styleUrls: ["./general.component.scss"]
})
export class GeneralComponent implements OnInit {
	public uform: FormGroup;
	public im: string;
	constructor(private cs: CompanyService, public g: Globals) {
		this.im = g.base_href + "assets/img/logo2.png";
		this.uform = new FormGroup({
			_acc_commercial: new FormControl("", [Validators.required]),
			_acc_socialMean: new FormControl("", [Validators.required]),
			_orgType: new FormControl("", [Validators.required])
		});
	}

	ngOnInit() {
		setTimeout(() => {
			var stp = new Promise((resolve, reject) => {
				this.cs
					.getCurrentAdminCompanyInfo({
						c: localStorage.getItem("my_company")
					})
					.toPromise()
					.then(
						(res: any) => {
							resolve(res);
						},
						err => {
							console.log(err);
						}
					);
			});
			stp.then((d: any) => {
				localStorage.setItem("accAdmin", JSON.stringify(d));
				this.im = d.Logo;
				this.uform.setValue({
					_acc_commercial: d.enseigneCommerciale,
					_acc_socialMean: d.raisonSociale,
					_orgType: d.typeOrganisation
				});
			});
		}, 1000);
	}

	onUpdateFormSubmit() {
		var cr = {
			raisonSociale: this.uform.value._acc_socialMean,
			enseigneCommerciale: this.uform.value._acc_commercial,
			typeOrganisation: this.uform.value._orgType,
			acc_id: localStorage.getItem("my_company")
		};
		this.cs.updateFormInfo(cr).subscribe((resp: any) => {});
	}

	readUrl(event: any) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();

			reader.onload = (event: any) => {
				this.im = event.target.result;
			};

			reader.readAsDataURL(event.target.files[0]);
		}
	}
}

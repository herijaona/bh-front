import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiHttpService } from "../../services/api-http/api-http.service";

@Component({
	selector: "app-activation",
	templateUrl: "./activation.component.html",
	styleUrls: ["./activation.component.scss"]
})
export class ActivationComponent implements OnInit, OnDestroy {
	private sub: any;
	private text_activation: string;
	constructor(
		private route: ActivatedRoute,
		private apiHttp: ApiHttpService
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.text_activation = params["code"]; // (+) converts string 'id' to a number
			this.apiHttp
				.postReqActivation({ activation_code: this.text_activation })
				.subscribe(
					(resp: any) => {
						console.log(resp);
					},
					err => {
						console.log(err);
					}
				);
		});
	}

	ngOnDestroy() {}
}

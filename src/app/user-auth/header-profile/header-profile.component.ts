import { Component, OnInit, ElementRef } from '@angular/core';
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { CompanyService } from "../../services/company/company.service";
import { SharedNotificationService } from "./../../services/shared-notification/shared-notification.service";


@Component({
  selector: 'header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  constructor(
  	public g: Globals,
		private el: ElementRef,
		private auth: AuthserviceService,
		private sh: SharedNotificationService,
		private cs: CompanyService) { }

  ngOnInit() {
  }

}

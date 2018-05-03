import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { CompanyService } from "../../services/company/company.service";


@Component({
  selector: 'zone-mindset',
  templateUrl: './zone-mindset.component.html',
  styleUrls: ['./zone-mindset.component.scss']
})
export class ZoneMindsetComponent implements OnInit {

  constructor(
    public g: Globals,
    private auth: AuthserviceService,
    private cs: CompanyService
  ) {}

  ngOnInit() {
  }

}

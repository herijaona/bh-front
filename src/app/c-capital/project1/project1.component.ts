import { Component, OnInit, ViewChild } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";

@Component({
  selector: "app-project1",
  templateUrl: "./project1.component.html",
  styleUrls: ["./project1.component.scss"]
})
export class Project1Component implements OnInit {
  public header_page_logo: string =
    this.g.base_href + "assets/img/logo-collaboration.png";
  constructor(public g: Globals, public auth: AuthserviceService) {}

  ngOnInit() {}
  showDetails() {
    console.log('ok');
  }
}

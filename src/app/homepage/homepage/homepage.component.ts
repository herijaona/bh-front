import { Component, OnInit } from "@angular/core";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { HomesliderComponent } from "../homeslider/homeslider.component";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"]
})
export class HomepageComponent implements OnInit {
 
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}

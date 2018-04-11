import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from "../../services/authservice/authservice.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthserviceService) { }

  ngOnInit() {
  }

}

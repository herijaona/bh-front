import { Component, OnInit } from '@angular/core';
import { AuthserviceService} from "../../services/authservice/authservice.service";
import { UserDetails} from "../../models/user-detail.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  details: UserDetails;

  constructor(private auth:AuthserviceService) { }
  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

}

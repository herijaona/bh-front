import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
import { Router} from "@angular/router";
import { DealSpaceService } from "../../services/deal-space/deal-space.service";
import { AuthserviceService } from "../../services/authservice/authservice.service";

@Component({
  selector: 'app-deal-space',
  templateUrl: './deal-space.component.html',
  styleUrls: ['./deal-space.component.scss']
})
export class DealSpaceComponent implements OnInit {
  public img_avatar: string;
  private collablists: any;
  private activeCollab: any;
  constructor(
      public g: Globals,
      private router: Router,
      private dealService: DealSpaceService,
      private auth: AuthserviceService
  ) {
    this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
   }

  ngOnInit() {
    this.getCollabsList();
  }

  async getCollabsList() {
    try {
      let cols: any = await this.dealService.getCollaborationsList();
      if (cols) {
        if (cols.status == "OK") {
          this.collablists = cols.data;
          console.log(this.collablists);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  public collabMouseEnter (id) {
    document.getElementById(id).style.backgroundColor = "rgba(255,255,255,1)";
  }

  public collabMouseLeave (id) {
    if (this.activeCollab != null && this.activeCollab == id) return true;
    document.getElementById(id).style.backgroundColor = "rgba(255,255,255,0)";
  }

  public getCollabData(collab) {
    document.getElementById("title_collab").innerText = collab.name;
    if (this.activeCollab != null)
      document.getElementById(this.activeCollab).style.backgroundColor = "#F4F5F7";
    document.getElementById(collab._id).style.backgroundColor = "#FFFFFF";
    this.activeCollab = collab._id;
    //alert(collab._id);
  }

  /*public changeTab (event, td) {
    if (this.activeTab != null)
      document.getElementById(this.activeTab).style.borderBottom = "solid 3px rgba(0,0,0,0)";
    document.getElementById(td).style.borderBottom = "solid 3px rgba(0,0,0,1)";
    this.activeTab = td;
  }*/

}

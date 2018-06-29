import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../services/authservice/authservice.service';
import { DealSpaceService } from '../../../../services/deal-space/deal-space.service';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit {

  private listDeal: any;

  constructor(
    private auth: AuthserviceService,
    private dealService: DealSpaceService,
  ) { }

  ngOnInit() {
    this.getListDealSpace();
  }

  async getListDealSpace() {
    try {
      let list: any = await this.dealService.getDealSpaceList();
      if (list.status == "OK") {
        console.log(list);
        this.listDeal = list.data;
      }
      else alert("Error when getting deal space list");
    }
    catch (ex) {
      console.log(ex);
    }
  }

}

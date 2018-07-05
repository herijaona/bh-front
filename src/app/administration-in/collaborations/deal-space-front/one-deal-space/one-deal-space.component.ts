import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../../../globals/globals';
import { ModalDirective } from 'angular-bootstrap-md';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-one-deal-space',
  templateUrl: './one-deal-space.component.html',
  styleUrls: ['./one-deal-space.component.scss'],
})
export class OneDealSpaceComponent implements OnInit {
  public img_avatar: string;
  data_: any;
  public currentDealID = '';
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  constructor(public g: Globals, private activRoute: ActivatedRoute) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
    /* this.activRoute.params.subscribe((params_: any) => {
      this.currentDealID = params_['dealID'];
    }); */
  }
  ngOnInit() {
    this.data_ = this.activRoute.snapshot.data;
    console.log(this.data_);
  }

  public insertObservation() {
    setTimeout(() => {
      this.myModalHist.show();
    }, 330);
  }
  public hideModal() {
    setTimeout(() => {
      this.myModalHist.hide();
    }, 330);
  }
}

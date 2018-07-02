import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../../../globals/globals';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-one-deal-space',
  templateUrl: './one-deal-space.component.html',
  styleUrls: ['./one-deal-space.component.scss'],
})
export class OneDealSpaceComponent implements OnInit {
  public img_avatar: string;
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  constructor(public g: Globals) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }
  ngOnInit() {}
  
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

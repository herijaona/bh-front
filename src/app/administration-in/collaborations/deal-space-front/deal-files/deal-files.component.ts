import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-deal-files',
  templateUrl: './deal-files.component.html',
  styleUrls: ['./deal-files.component.scss']
})
export class DealFilesComponent implements OnInit {
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  constructor() { }

  ngOnInit() {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from "angular-bootstrap-md";
@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {
  @ViewChild("modalHist") public myModalHist: ModalDirective;
  constructor() { }

  public showMod() {
		setTimeout(() => {
			this.myModalHist.show();
		}, 330);
	}

  ngOnInit() {
  }

}

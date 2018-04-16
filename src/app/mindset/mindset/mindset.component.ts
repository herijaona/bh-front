import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";


@Component({
  selector: 'app-mindset',
  templateUrl: './mindset.component.html',
  styleUrls: ['./mindset.component.scss']
})
export class MindsetComponent implements OnInit {


  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor(public g : Globals) { }

  ngOnInit() {
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

}




  
import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  backgroundImg :string;
  constructor(private sanitizer:DomSanitizer) {
    
   }

  ngOnInit() {
    this.backgroundImg = 'http://dl27.fotosklad.org.ua/20121020/6d0d7b1596285466e8bb06114a88c903.jpg';
  }

}

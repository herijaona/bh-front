import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  //mdbootstrap options carroussel
  public myInterval: number = 3000;
  public activeSlideIndex: number = 0;
  public noWrapSlides:boolean = false;
  
  activeSlideChange(){
      console.log(this.activeSlideIndex);
  }

  public slides:Array<Object> = [
      {"image":"/assets/img/bg-accueil.jpg"},
      {"image":"/assets/img/bg2.jpg"},
      {"image":"/assets/img/bg3.jpg"},
  ];
  constructor(private sanitizer:DomSanitizer) {
    
   }

  ngOnInit() {
  }

}

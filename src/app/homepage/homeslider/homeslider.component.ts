import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
	selector: "homeslider",
	templateUrl: "./homeslider.component.html",
	styleUrls: ["./homeslider.component.scss"]
})
export class HomesliderComponent implements OnInit {
	//mdbootstrap options carroussel
	public myInterval: number = 3000;
	public activeSlideIndex: number = 0;
	public noWrapSlides: boolean = false;
	private registerLink:string;

	public slides: Array<Object> = [
		{ image: "/assets/img/bg-accueil.jpg" },
		{ image: "/assets/img/bg2.jpg" },
		{ image: "/assets/img/bg3.jpg" }
	];
	constructor(private router : Router) {}

	activeSlideChange() {
		// console.log(this.activeSlideIndex);
	}


	ngOnInit() {}

	registerCompan(event){
		event.preventDefault();
		this.router.navigateByUrl("/registerCompany");
	}
}

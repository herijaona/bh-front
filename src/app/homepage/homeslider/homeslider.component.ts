import { Component, OnInit } from "@angular/core";

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

	public slides: Array<Object> = [
		{ image: "/assets/img/bg-accueil.jpg" },
		{ image: "/assets/img/bg2.jpg" },
		{ image: "/assets/img/bg3.jpg" }
	];
	constructor() {}

	activeSlideChange() {
		console.log(this.activeSlideIndex);
	}


	ngOnInit() {}
}

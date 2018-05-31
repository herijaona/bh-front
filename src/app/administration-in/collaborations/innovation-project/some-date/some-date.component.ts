import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IMyDpOptions } from "mydatepicker";

@Component({
	selector: "some-date",
	templateUrl: "./some-date.component.html",
	styleUrls: ["./some-date.component.scss"]
})
export class SomeDateComponent implements OnInit {
	@Output() valueDate = new EventEmitter<{}>();
	public myDatePickerOptions: IMyDpOptions = {
		dateFormat: "dd.mm.yyyy",
		editableDateField: false,
		showTodayBtn: false,
		disableUntil: {
			year: new Date(Date.now()).getFullYear(),
			month: new Date(Date.now()).getMonth() + 1,
			day: new Date(Date.now()).getDate()
		}
	};

	public modelDate: { [key: string]: any } = {
		limitdate: {},
		discussdate: {},
		applicationselecteddate: {}
	};
	constructor() {}

	ngOnInit() {}
	onDateChanged(event, date_T) {
		console.log("--");
		console.log(this.modelDate);
		console.log("--");
		this.valueDate.emit(this.modelDate);
	}
}

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
		showTodayBtn: false
	};

	public modelDate: { [key: string]: any } = {
		limitdate: {},
		discussdate: {},
		applicationselecteddate: {}
	};
	constructor() {}

	ngOnInit() {}
	onDateChanged(event, date_T) {
		console.log(event);
		console.log(date_T);
		Object.keys(this.modelDate).forEach(el => {
			if (date_T == el) {
				if (event.jsdate) {
					if (event.jsdate.valueOf() < Date.now()) {
						delete this.modelDate[el];
						this.modelDate[el] = {};
						this.valueDate.emit(this.modelDate);
					} else {
						this.valueDate.emit(this.modelDate);
					}
				}
			}
		});
	}
}

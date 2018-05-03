import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class SharedNotificationService {
	/*
	* Load view : called when data change for all view reload their data
	*/

	private loadingMessage = new BehaviorSubject<Object>({});
	private headerUpdateMessage = new BehaviorSubject<Object>({});
	private companyNotif = new BehaviorSubject<Object>({});
	private toastNotif = new BehaviorSubject<Object>({});
	private updateViewNotif = new BehaviorSubject<Object>({});
	// private missionConfirmedSource = new Subject<any>();

	/*
	* Load view : called when data change for all view reload their data
	*/

	run_loader$ = this.loadingMessage.asObservable();
	run_runUpdateHeader$ = this.headerUpdateMessage.asObservable();
	notifCompany$ = this.companyNotif.asObservable();
	ViewUpdateNotif$ = this.updateViewNotif.asObservable();
	notifToast$ = this.toastNotif.asObservable();

	constructor() {}
	// Service message commands
	runloader(message: any) {
		this.loadingMessage.next(message);
	}

	updateHeader(message: any) {
		this.headerUpdateMessage.next(message);
	}

	notifDataUnvaliable(d: any) {
		this.companyNotif.next(d);
	}

	notifyUpdateView(ew) {
		this.updateViewNotif.next(ew);
	}

	notifToast(arg: any) {
		this.toastNotif.next(arg);
	}

	/*
	* Data Ready 
	*/
	private DataReadyNotif = new BehaviorSubject<Object>({});
	readyData$ = this.DataReadyNotif.asObservable();
	tellDataReady(arg: any) {
		this.DataReadyNotif.next(arg);
	}

	/*
	* Event on Button section edit clicked
	*/
	private editEventNotif = new BehaviorSubject<Object>({});
	editEvent$ = this.editEventNotif.asObservable();

	sectiontoEdit(arg) {
		this.editEventNotif.next(arg);
	}

	/*
	* Load view : called when data change for all view reload their data
	*/
	private loadBus = new BehaviorSubject<Object>({});
	viewLoadBus$ = this.loadBus.asObservable();

	sendDataBus(arg: any) {
		this.loadBus.next(arg);
	}

	/*
	* Edit button notification
	*/
	private editButtonNotif = new BehaviorSubject<Object>({});
	notifButton$ = this.editButtonNotif.asObservable();

	pageEditButton(arg: any) {
		this.editButtonNotif.next(arg);
	}

	/*
	* Event when image selected on the modal image selection
	*/
	private imSelect_ = new BehaviorSubject<Object>({});
	im_Selected$ = this.imSelect_.asObservable();

	imageSelected(arg: any) {
		this.imSelect_.next(arg);
	}

	
	/*
	* State of edit
	*/
	getLocalEditState() {
		return window.localStorage.getItem("EditState");
	}

	getEditTime() {
		let tm = parseInt(localStorage.getItem("setTime"));
		if (tm && Date.now() - tm < 1800000) {
			return true;
		}
		return false;
	}

	setLocalEditState(st: any) {
		if (st) {
			window.localStorage.setItem("setTime", Date.now().toString());
		} else {
			window.localStorage.removeItem("setTime");
		}
		return window.localStorage.setItem("EditState", st);
	}
}

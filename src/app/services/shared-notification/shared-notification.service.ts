import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class SharedNotificationService {
	/*
	* Load view : called when data change for all view reload their data
	*/
	private loadView = new BehaviorSubject<Object>({});

	private loadingMessage = new BehaviorSubject<Object>({});
	private headerUpdateMessage = new BehaviorSubject<Object>({});
	private companyNotif = new BehaviorSubject<Object>({});
	private toastNotif = new BehaviorSubject<Object>({});
	private DataReadyNotif = new BehaviorSubject<Object>({});
	private updateViewNotif = new BehaviorSubject<Object>({});
	// private missionConfirmedSource = new Subject<any>();

	/*
	* Load view : called when data change for all view reload their data
	*/
	viewLoad$ = this.toastNotif.asObservable();

	run_loader$ = this.loadingMessage.asObservable();
	run_runUpdateHeader$ = this.headerUpdateMessage.asObservable();
	notifCompany$ = this.companyNotif.asObservable();
	ViewUpdateNotif$ = this.updateViewNotif.asObservable();
	notifToast$ = this.toastNotif.asObservable();
	readyData$ = this.DataReadyNotif.asObservable();

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

	tellDataReady(arg: any) {
		this.DataReadyNotif.next(arg);
	}

	/*
	* Load view : called when data change for all view reload their data
	*/
	loadViewData(arg: any) {
		this.loadView.next(arg);
	}
}

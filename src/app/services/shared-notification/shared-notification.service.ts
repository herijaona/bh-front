import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedNotificationService {
	private loadingMessage = new BehaviorSubject<Object>({});
	private headerUpdateMessage = new BehaviorSubject<Object>({});
	private companyNotif = new BehaviorSubject<Object>({});
	private toastNotif = new BehaviorSubject<Object>({});
	private updateViewNotif = new BehaviorSubject<Object>({});
	// private missionConfirmedSource = new Subject<any>();
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

	notifDataUnvaliable(d : any){
		this.companyNotif.next(d);
	}

	notifyUpdateView(ew){
		this.updateViewNotif.next(ew);
	}
	notifToast(arg : any ){
		this.toastNotif.next(arg);
	}
}

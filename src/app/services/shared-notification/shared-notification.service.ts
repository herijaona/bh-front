import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedNotificationService {
	private loadingMessage = new BehaviorSubject<Object>({});
	// private missionConfirmedSource = new Subject<any>();
	run_loader$ = this.loadingMessage.asObservable();
	constructor() {}
	// Service message commands
	runloader(message: any) {
		this.loadingMessage.next(message);
	}
}

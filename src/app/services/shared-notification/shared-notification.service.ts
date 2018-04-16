import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SharedNotificationService {
	private loadingMessage = new Subject<any>();
	// private missionConfirmedSource = new Subject<any>();
	run_loader$ = this.loadingMessage.asObservable();
	constructor() {}
	// Service message commands
	runloader(message: any) {
		this.loadingMessage.next(message);
	}
}

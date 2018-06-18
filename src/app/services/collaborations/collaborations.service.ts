import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BaseHttpService } from "../base-http/base-http.service";

@Injectable()
export class CollaborationsService extends BaseHttpService {
    public getCollaborationsList() {
        return this.fetch('get', 'admin-cca/getCollabLists').toPromise();
    }
}
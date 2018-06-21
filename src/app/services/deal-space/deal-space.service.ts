import { Injectable } from "@angular/core";
import { BaseHttpService } from "../base-http/base-http.service";

@Injectable()
export class DealSpaceService extends BaseHttpService {
    public getCollaborationsList() {
        return this.fetch('get', 'admin-cca/getCollabLists').toPromise();
    }

    public postQuestion(data) {
        return this.fetch('post', 'question-data', data).toPromise();
    }

    public getAllQuestionsCompany() {
        return this.fetch('get', 'getallCompanyQuestions').toPromise();
    }
}
import { Injectable } from "@angular/core";
import { BaseHttpService } from "../base-http/base-http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Globals } from "./../../globals/globals";

@Injectable()
export class CompanyService extends BaseHttpService {
	constructor(public http: HttpClient, public g: Globals) {
		super(http, g);
	}

	getAllCompanies(){
    return this.request('get', 'all_companies', {});
  }

  getCurrentAdminCompanyInfo(i){
    return this.request('post', 'gen_info_companies',i,true);
  }

  updateFormInfo(i){
    return this.request('post', 'updatecompanies',i,true);
  }

}

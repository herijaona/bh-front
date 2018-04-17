import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Globals } from './../../globals/globals';

@Injectable()
export class ApiHttpService {
	private endPointUrl: string;

  constructor( private http : HttpClient, private g : Globals ) {
    this.endPointUrl = this.g.api_baseUrl;
  }

 

    private request(method: 'post'|'get', resources: string, data:any , params: {[key: string]: any} = {}, headers: {[key: string]: string} = {}): Observable<any> {
    let base;
    if (method === 'post') {
      base = this.http.post(this.endPointUrl+`/api/${resources}`, data);
    } else {
      base = this.http.get(this.endPointUrl+`/api/${resources}`);
    }
    return base;
  }

  postUpImages( data: any){
  	return this.request('post', 'up_images', data);
  }

  postReqActivation(text_){
  	return this.request('post', 'activate', text_);
  }

  getAllCompanies(){
    return this.request('get', 'all_companies', {});
  }

}

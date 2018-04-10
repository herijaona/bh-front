import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ApiHttpService {
	private endPointUrl: string = "http://localhost:3000";

  constructor( private http : HttpClient ) {}

 

    private request(method: 'post'|'get', resources: string, data:any , params: {[key: string]: any} = {}, headers: {[key: string]: string} = {}): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.endPointUrl+`/api/${resources}`, data);
    } else {
      // base = this.http.get(this.endPointUrl+`/api/${type}`, { headers: new HttpHeaders().append("Authorization",'Bearer '+ this.getToken()) });
    }
    return base;
  }

  postReq( data: any, resources){
  	return this.request('post', resources, data);
  }

}

import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";
import { Router } from "@angular/router";
import { UserDetails } from "../../models/user-detail.model";
import "rxjs/add/operator/map";
import { Globals } from "./../../globals/globals";

export interface userDataPaylod {
  email: string;
  password: string;
  name?: string;
  lastname?: string;
  firstname?: string;
}

interface TokenResponse {
  token: string;
}

@Injectable()
export class AuthserviceService {
  private token: string;
  private endPointUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private g: Globals
  ) {
    this.endPointUrl = this.g.api_baseUrl;
  }

  public saveUser(user: UserDetails): void {
    localStorage.setItem("bh-user", JSON.stringify(user));
  }
  public getUser(): any {
    var u = localStorage.getItem("bh-user");
    console.log(u);
    if (u) {
      return JSON.parse(u);
    } else {
      return null;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem("bh-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("bh-token");
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(
    method: "post" | "get",
    type: any,
    user?: any,
    withtoken?: any
  ): Observable<any> {
    let base;
    if (withtoken) {
      if (method === "post") {
        base = this.http.post(this.endPointUrl + `/api/${type}`, user, {
          headers: new HttpHeaders().append(
            "Authorization",
            "Bearer " + this.getToken()
          )
        });
      } else {
        base = this.http.get(this.endPointUrl + `/api/${type}`, {
          headers: new HttpHeaders().append(
            "Authorization",
            "Bearer " + this.getToken()
          )
        });
      }
    } else {
      if (method === "post") {
        base = this.http.post(this.endPointUrl + `/api/${type}`, user);
      } else {
        base = this.http.get(this.endPointUrl + `/api/${type}`);
      }
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: any): Observable<any> {
    return this.request("post", "register", user);
  }

  public login(user: any): Observable<any> {
    return this.request("post", "login", user);
  }

  public profile(): Observable<any> {
    return this.request("get", "profile", {}, true);
  }

  public editprofile(user: any): Observable<any> {
    return this.request("post", "profile/edit", user, true);
  }

  public editpass(user: any): Observable<any> {
    return this.request("post", "profile/editpass", user, true);
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("bh-token");
    window.localStorage.removeItem("bh-user");
    this.router.navigateByUrl("/");
  }
}

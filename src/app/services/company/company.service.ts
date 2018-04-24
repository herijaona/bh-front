import { Injectable } from "@angular/core";
import { BaseHttpService } from "../base-http/base-http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Globals } from "./../../globals/globals";

@Injectable()
export class CompanyService extends BaseHttpService {
  private cLabel = {
    cID: "myCompany",
    genFlag: "gen_flag",
    localCData: "accAdmin"
  };
  constructor(public http: HttpClient, public g: Globals) {
    super(http, g);
  }

  getAllCompanies() {
    return this.request("get", "all_companies", {});
  }

  getCurrentAdminCompanyInfo(i, update: boolean = false) {
    return new Promise((resolve, reject) => {
      if (this.isCDataStored() && !update) {
        resolve(this.getLocalCData());
      } else {
        this.request("post", "gen_info_companies", { c: i }, true)
          .toPromise()
          .then(
            (d: any) => {
              this.setDataC(d);
              resolve(d);
            },
            err => {
              reject(err.error);
            }
          );
      }
    });
  }

  updateFormInfo(i) {
    return this.request("post", "updatecompanies", i, true);
  }

  setDataC(v) {
    localStorage.setItem(this.cLabel.localCData, JSON.stringify(v));
  }

  isCDataStored() {
    return localStorage.getItem(this.cLabel.localCData) ? true : false;
  }

  getLocalCData() {
    return JSON.parse(localStorage.getItem(this.cLabel.localCData));
  }

  storeMycompanyId(i) {
    localStorage.setItem("my_company", i);
  }

  getMycompanyId() {
    return localStorage.getItem("my_company");
  }

  isCDataId() {
    return localStorage.getItem("my_company") ? true : false;
  }

  genVueFlag(i: boolean, v?: any) {
    if (i) {
      return localStorage.getItem(this.cLabel.genFlag);
    } else {
      localStorage.setItem(this.cLabel.genFlag, v);
    }
  }

  removeData() {
    localStorage.removeItem(this.cLabel.genFlag);
    /*  localStorage.removeItem(this.cLabel.cID);
    localStorage.removeItem(this.cLabel.localCData);*/
  }

  updateDataImage(idim,acId,dim) {
    let ivar = {
          IdIm: idim,
          acc_id: acId,
          dataIm: dim
        };
    return new Promise((resolve, reject) => {
      this.request("post", "update-DataImage-companie", ivar , true).subscribe(
        (e: any) => {
          resolve(e);
        }
      );
    });
  }

  updatePagetoShow(w: any) {
    let dw = w.d;
    dw.acc_id = w.acc_id;
    return new Promise((resolve, reject) => {
      this.request("post", "updateCompanyShowPage", dw, true)
        .toPromise()
        .then(
          (re: any) => {
            resolve(re);
          },
          err => {
            console.log(err);
            reject(err.error);
          }
        );
    });
  }
}

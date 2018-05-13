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
  removeMycompanyId() {
    localStorage.removeItem("my_company");
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
  updateDataInfo(i): Promise<any> {
    return this.request("post", "updatecompanies", i, true).toPromise();
  }
  updateDataImage(idim, acId, dim) {
    let ivar = {
      IdIm: idim,
      acc_id: acId,
      dataIm: dim
    };
    return new Promise((resolve, reject) => {
      this.request("post", "update-DataImage-companie", ivar, true).subscribe(
        (e: any) => {
          resolve(e);
        }
      );
    });
  }
  updateCompanyImages(data, entity): Promise<any> {
    let ress: string;
    if (entity == "account") {
      ress = "updateCompanyImages";
    } else if (entity == "user") {
      ress = "updateUserImages";
    }
    return this.fetch("post", ress, data, {}).toPromise();
  }

  getImBiblio(data, entity) {
    let ress: string;
    if (entity == "account") {
      ress = "biblioImageCompany";
    } else if (entity == "user") {
      ress = "biblioImageUser";
    }
    return this.fetch(
      "get",
      ress,
      {
        data: data,
        entity: entity
      },
      {
        "X-Type-Data": data
      }
    ).toPromise();
  }

  updatePagetoShow(w: any) {
    let dw = w.d;
    return this.fetch("post", "updateCompanyShowPage", dw).toPromise();
  }
  public saveZoneData(dt: any) {
    return this.fetch("post", "saveZoneData", dt).toPromise();
  }
  public saveZoneEditData(dt: any) {
    return this.fetch("post", "saveZoneEditData", dt).toPromise();
  }
  public savePrData(d) {
    return this.fetch("post", "save-presentation", d);
  }
  getMindsetData() {
    return this.fetch("get", "getAdminMindsetData");
  }
  /*
     * Get all Companies
     */
  getAllCompanies(): Promise<any> {
    return this.fetch("get", "all_companies").toPromise();
  }
  getCurrentAdminCompanyInfo(i, update: boolean = false) {
    return new Promise((resolve, reject) => {
      if (this.isCDataStored() && !update) {
        resolve(this.getLocalCData());
      } else {
        this.fetch("post", "gen_info_companies", {
          c: i
        })
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
  getZone(id_zn) {
    return new Promise((resolve, reject) => {
      this.fetch("get", "zone", {
        idzone: id_zn
      })
        .toPromise()
        .then(r => {
          resolve(r);
        });
    });
  }
  deleteZone(arg: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetch("delete", "zone", {
        idzone: arg
      })
        .toPromise()
        .then(
          reslt => {
            resolve(reslt);
          },
          err => {
            reject(err.error);
          }
        );
    });
  }
  getCompanyDetails(parms) {
    return this.fetch("get", "company_details", {
      company_slug: parms
    }).toPromise();
  }

  public getMyCompanData() {
    return this.fetch("get", "userCompanyDetails").toPromise();
  }

  getCompanyPresentation(parms) {
    return this.fetch("get", "company_presentation", {
      company_slug: parms
    }).toPromise();
  }

  public saveCompanyPresentation(d) {
    return this.fetch("post", "save-presentation", d).toPromise();
  }
  public saveNoHostedVideo(d) {
    return this.fetch("post", "save_videos_no_hosted", d).toPromise();
  }

  public allZoneData(d) {
    return this.fetch("get", "all-zone", {
      company_slug: d
    }).toPromise();
  }

  public getUsrImBiblio(arg) {}
}

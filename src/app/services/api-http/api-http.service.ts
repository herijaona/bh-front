import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseHttpService } from "../base-http/base-http.service";
import { Globals } from "./../../globals/globals";

@Injectable()
export class ApiHttpService extends BaseHttpService {
  constructor(public http: HttpClient, public g: Globals) {
    super(http, g);
  }

  postUpImages(data: any) {
    return this.request("post", "up_images", data);
  }

  /*Request Activation */
  postReqActivation(text_) {
    return this.request("post", "activate", text_);
  }

  /*Get all companies*/
  getAllCompanies() {
    return this.request("get", "all_companies", {});
  }

  /*Uploads Image to the server */
  formImUpload(inputEl: HTMLInputElement) {
    let imID: string;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    let promise = new Promise((resolve, reject) => {
      if (fileCount == 0) {
        resolve({
          status: 0,
          data: null
        });
      } else {
        formData.append(
          "im_up",
          inputEl.files.item(0),
          inputEl.files.item(0).name
        );
        this.postUpImages(formData)
          .toPromise()
          .then(
            (resp: any) => {
              if (resp.status == "OK") {
                resolve({
                  status: 1,
                  data: resp
                });
              }
            },
            err => {
              reject({ status: 0, data: err.error });
            }
          );
      }
    });
    return promise;
  }
}

import {
  Component,
  OnInit,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectsService } from "../../../services/projects/projects.service";
import { SharedNotificationService } from "./../../../services/shared-notification/shared-notification.service";
import { Globals } from "./../../../globals/globals";
declare const CKEDITOR: any;

@Component({
  selector: "innovation-project",
  templateUrl: "./innovation-project.component.html",
  styleUrls: ["./innovation-project.component.scss"]
})
export class InnovationProjectComponent implements OnInit, OnDestroy {
  public prModel: { [key: string]: any } = {
    pr_contexte_ProjectEditor: "",
    pr_objectif_ProjectEditor: "",
    pr_elementProposition_ProjectEditor: "",
    pr_name: "",
    pr_processDecision: ""
  };

  public cPrModel = {
    pr_dataConfidential: "",
    pr_confidentialExistData: "",
    pr_collabDurationType: ""
  };
  public buttSaveErr: { [key: string]: boolean } = {
    pr_contexte_ProjectEditor: false,
    pr_objectif_ProjectEditor: false,
    pr_elementProposition_ProjectEditor: false,
    pr_name: false,
    pr_processDecision: false
  };
 
  public shDate = false;
  public shConfidential = false;

  public noValid: boolean = true;
  public dataReadyIn: boolean = false;
  public selContinent: any = [];

  public todoAct: string;
  public c_part = "europa";
  public accId: string;
  public dataCurr: any = {};
  public editAct: string = "EditAct";
  public collabDateObject: any;
  public addAct: string = "AddAct";
  public projform: FormGroup;
  public prData: any;
  @Input("todoAct_")
  set todoAct_(arg) {
    this.todoAct = arg;
  }
  @Input("prData_")
  set prData_(arg) {
    this.prData = arg;
  }

  public ListCo: any = [];
  public diffusionModelCountry: any = {
    africa: [],
    europa: [],
    oceania: [],
    asia: [],
    america: []
  };
  public diffusionModelContinent = {
    asia: false,
    america: false,
    africa: false,
    europa: false,
    oceania: false
  };

  constructor(
    public g: Globals,
    private pr: ProjectsService,
    private sh: SharedNotificationService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.sh.busDataIn$.subscribe((st: any) => {
      switch (st.from) {
        case "editKeyGeneral":
          this.accId = st.data;
      }
    });
    this.todoAct = this.addAct;
    if (this.todoAct == this.editAct) {
      this.getDataProject();
    } else {
      this.getCountryList();
    }
  }
  async getCountryList() {
    try {
      const cListres = await this.pr.countryGet();
      if (cListres) {
        if (cListres["status"] === "OK") {
          this.ListCo = cListres["data"];
          this.dataReadyIn = true;
          this.selContinent = this.ListCo["europa"];
        }
      }
    } catch (e) {}
  }

  async getDataProject() {
    try {
      let prD: any = await this.pr.getProjectByID(this.prData._id);
      if (prD.status == "OK") {
        this.dataCurr = prD;
        Object.keys(this.prModel).forEach(el => {
          this.prModel[el] = prD.data[el.split("_")[1]];
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async saveProjects() {
    console.log(this.prModel);
    console.log(this.cPrModel);

    let new_val: { [key: string]: any } = {};
    Object.keys(this.prModel).forEach(e => {
      new_val[e.split("_")[1]] = this.prModel[e];
    });

    const dataInnovColab = {
      typeCollab: "COLLABPROJINNOV",
      dataDetails: {
        collabDescribData: new_val,
        collabDurationType: this.cPrModel.pr_collabDurationType,
        collabDurationData: this.collabDateObject,
        hasInfoConfidential: this.cPrModel.pr_confidentialExistData,
        infoConfidentialData: this.cPrModel.pr_dataConfidential,
        diffusionDatas: {
          continent: this.diffusionModelContinent,
          partCountry: this.diffusionModelCountry
        }
      }
    };

    try {
      let save_res: any;
      if (this.todoAct === this.editAct) {
        let data = { edited: new_val, id_: this.prData._id };
        save_res = await this.pr.saveEditProject(data);
      } else {
        save_res = await this.pr.saveNewsProject(dataInnovColab);
      }

      if (save_res) {
        if (save_res.status == "OK") {
          this.sh.notifToast({
            type: "success",
            message: "<p>Project saved successfully</p>"
          });
          this.sh.pushData({
            from: "projectNEW",
            action: "refresh",
            data: "end"
          });
          this.el.nativeElement.style.display = "none";
        }
      }
    } catch (e) {
      console.log(e);
    }
    /*
		try {
			let save_res: any;
			if (this.todoAct == this.editAct) {
				let data = { edited: new_val, id_: this.prData._id };
				save_res = await this.pr.saveEditProject(data);
			} else {
				save_res = await this.pr.saveNewsProject(new_val);
			}
			if (save_res) {
				if (save_res.status == 'OK') {
					this.sh.notifToast({
						type: 'success',
						message: '<p>Configuration saved</p>'
					});
					this.sh.pushData({
						from: 'projectNEW',
						action: 'refresh',
						data: 'end'
					});
					this.el.nativeElement.style.display = 'none';
				}
			}
		} catch (e) {}*/
  }
  onReady(vent) {
    if ("status" in this.dataCurr) {
      if (this.dataCurr["status"] == "OK") {
        Object.keys(this.prModel).forEach(el => {
          this.prModel[el] = this.dataCurr.data[el.split("_")[1]];
        });
      }
    }
  }

  onChange(event) {
    let tValid = [];
    Object.keys(this.prModel).forEach(e => {
      if (this.prModel[e] != null) {
        if (this.prModel[e].length == 0) {
          // code...
          this.buttSaveErr[e] = true;
        } else {
          this.buttSaveErr[e] = false;
        }
      } else {
        this.buttSaveErr[e] = true;
      }
    });

    let vl = Object.values(this.buttSaveErr);
    let iter = 0;
    for (let i of vl) {
      if (i) {
        // this.noValid = true;
        break;
      }
      ++iter;
    }
    tValid["descr"] = iter == vl.length ? "NOK" : "OK";

    tValid["duration"] = "OK";
    let drtion = this.cPrModel.pr_collabDurationType;

    if (drtion == "programmed") {
      if (this.collabDateObject) {
        if (!this.collabDateObject["limitdate"]) {
          tValid["duration"] = "OK";
        } else {
          tValid["duration"] = "NOK";
        }
      }
    } else if (drtion == "continue") {
      tValid["duration"] = "NOK";
    }

    tValid["dataSecret"] = "OK";
    let scret = this.cPrModel.pr_confidentialExistData;
    if (scret == "yes") {
      if (this.cPrModel.pr_dataConfidential != "") {
        tValid["dataSecret"] = "NOK";
      }
    } else if (scret == "no") {
      tValid["dataSecret"] = "NOK";
    } else {
      tValid["dataSecret"] = "OK";
    }

    /* tValid['diffsion'] = 'OK';
    let diffType = Object.keys(this.diffusionTypes);
    for (let r of diffType) {
      if (this.diffusionTypes[r]) {
        if (r == 'continent') {
          let ct = Object.keys(this.diffusionModelContinent);
          for (let ctin of ct) {
            if (this.diffusionModelContinent[ctin]) {
              tValid['diffsion'] = 'NOK';
              break;
            }
          }
        } else if (r == 'country') {
          if (this.diffusionModelCountry.length) {
            tValid['diffsion'] = 'NOK';
          }
        } else if (r == 'part') {
          tValid['diffsion'] = 'NOK';
        }
      }
    } */

    this.noValid = !this.IsAllGood(tValid);
  }

  IsAllGood(tb: any): boolean {
    const obk = Object.keys(tb);
    for (let ext of obk) {
      if (tb[ext] === "OK") {
        return false;
      }
    }
    return true;
  }

  durationTypeCollaborationChange() {
    this.shDate = this.cPrModel.pr_collabDurationType === "programmed";
    if (!this.shDate) {
      this.collabDateObject = {};
    }
    this.onChange("e");
  }
  onEditorChange(vent) {}
  onBlur(vent) {}
  onFocus(vent) {}

  saveDate(event) {
    console.log(event);
    this.collabDateObject = event;
    this.onChange(event);
  }
  onConfidentialChange(event) {
    this.cPrModel.pr_confidentialExistData = event.target.value;
    this.shConfidential = this.cPrModel.pr_confidentialExistData === "yes";
    if (!this.shConfidential) {
      this.cPrModel.pr_dataConfidential = "";
    }
    this.onChange(event);
  }

  selectCountryDIffusion() {
    this.onChange("e");
  }
  continentCh() {
    this.onChange("e");
  }

  changeCountryPart() {
    this.selContinent = this.ListCo[this.c_part];
  }
  addNewItemCC(it, c_part, pType) {
    let newItem = {
      code: it.code,
      country: it.country
    };
    newItem[pType] = true;
    this.diffusionModelCountry[c_part].push(newItem);
  }

  viewChnge(event, flag) {
    const myNodelist = event.target.childNodes;
    console.log(this.diffusionModelCountry);
    for (let i = 0; i < myNodelist.length; i++) {
      if (myNodelist[i].tagName === "INPUT") {
        if (flag) {
          myNodelist[i].checked = true;
        } else {
          myNodelist[i].checked = false;
        }
      }
    }
  }
  selectPartC(e, item, part_type) {
    let curr_continent = this.diffusionModelCountry[this.c_part];
    let cc_len = curr_continent.length;
    if (cc_len === 0) {
      this.addNewItemCC(item, this.c_part, part_type);
      // this.viewChnge(e, true);
    } else {
      let existIN = curr_continent.filter(el => el.code === item.code);
      if (existIN.length === 0) {
        this.addNewItemCC(item, this.c_part, part_type);
        // this.viewChnge(e, true);
      } else {
        this.diffusionModelCountry[this.c_part] = this.diffusionModelCountry[
          this.c_part
        ].map((el, indx) => {
          if (el.code === item.code) {
            if (el.hasOwnProperty(part_type)) {
              if (el[part_type]) {
                delete el[part_type];
                // this.viewChnge(e, false);
              }
            } else {
              el[part_type] = true;
              // this.viewChnge(e, true);
            }
          }
          return el;
        });
      }
    }
  }
  selectIncubator($event, item) {
    console.log(item);
  }
  selectResearch($event, item) {
    console.log(item);
  }
  selectCapitalVenture($event, item) {
    console.log(item);
  }

  checkItems(item, pT) {
    let curr_continent = this.diffusionModelCountry[this.c_part];
    let cc_len = curr_continent.length;
    if (cc_len === 0) {
      return false;
    } else {
      let existIN = curr_continent.filter(el => el.code === item.code);
      if (existIN.length === 0) {
        return false;
      } else {
        if (existIN[0].hasOwnProperty(pT)) {
          if (existIN[0][pT]) {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  }

  ngOnDestroy() {
    this.sh.pushData({});
    /*for (let x in CKEDITOR.instances) {
			CKEDITOR.instances[x].destroy(true);
		}*/
  }
}

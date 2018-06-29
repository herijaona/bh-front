import { Component, OnInit, ViewChild } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { ProjectsService } from "../../services/projects/projects.service";
import { Router, ActivatedRoute } from "@angular/router";
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { Subject } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';

@Component({
  selector: "app-project1",
  templateUrl: "./project1.component.html",
  styleUrls: ["./project1.component.scss"]
})
export class Project1Component implements OnInit {
  public header_page_logo: string =
    this.g.base_href + "assets/img/logo-collaboration.png";
  projectList: any;
  dataChange = new Subject<number>();
  selectedcCountry;
  selectedtypeCollab;
  selectedActivity;
  constructor(public g: Globals, public auth: AuthserviceService, 
    public projectService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    this.selectedcCountry = this.route.snapshot.queryParams.cCountry;
    this.selectedtypeCollab = this.route.snapshot.queryParams.typeCollab;
    this.selectedActivity = this.route.snapshot.queryParams.areaActivity;
    merge(this.dataChange)
      .pipe(
      startWith({}),
      switchMap(() => {
        const queryParams = this.getQueryParams();  
        this.router.navigateByUrl(queryParams); 
        return this.projectService.getCollabFilter(this.selectedcCountry, this.selectedtypeCollab, 
          this.selectedActivity);
      }),
      map(data => {
        return data;
      }),
      catchError((e) => {
        if (e.status === 403) {
        }
        return observableOf([]);
      })
      ).subscribe(data => {
        this.projectList = data;
        this.projectList = this.projectList.data;
      });
  }
  displaycountrySelect(filter) {
    this.selectedcCountry = filter;
    this.dataChange.next(this.selectedcCountry);
  }
  displayCollabSelect(filter) {
    this.selectedtypeCollab = filter;
    this.dataChange.next(this.selectedtypeCollab);
  }
  displayActivitySelect(filter) {
    this.selectedActivity = filter;
    this.dataChange.next(this.selectedActivity);
  }
  
  private getQueryParams() {
    let queryParams = '/c-capital/innovations?';
    if (this.selectedcCountry) queryParams += `cCountry=${this.selectedcCountry}`;
    if (this.selectedtypeCollab) queryParams += `&typeCollab=${encodeURIComponent(this.selectedtypeCollab)}`;
    if (this.selectedActivity) queryParams += `&areaActivity=${encodeURIComponent(this.selectedActivity)}`;
    return queryParams;
  }
}

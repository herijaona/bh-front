import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects/projects.service';

@Component({
  selector: 'app-application-sent',
  templateUrl: './application-sent.component.html',
  styleUrls: ['./application-sent.component.scss'],
})
export class ApplicationSentComponent implements OnInit {
  public allApplData: any = [];
  constructor(private pr: ProjectsService) {}

  ngOnInit() {
    this.getAllCApplicationSent();
  }
  async getAllCApplicationSent() {
    this.allApplData = [];
    try {
      const appl: any = await this.pr.getUserApplicationSent();
      if (appl.status === 'OK') {
        this.allApplData = appl.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

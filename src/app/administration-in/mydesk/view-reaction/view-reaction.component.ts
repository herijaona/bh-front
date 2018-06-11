import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../../globals/globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { ModalDirective } from "angular-bootstrap-md";
@Component({
  selector: 'view-reaction',
  templateUrl: './view-reaction.component.html',
  styleUrls: ['./view-reaction.component.scss'],
})
export class ViewReactionComponent implements OnInit {
  @ViewChild("modalHist") public myModalHist: ModalDirective;
  public viewreaction_page = 'viewreaction_page';
  public allQuestions: any = [];
  constructor(private tms: TeamsService, private titl: Title, public g: Globals) {}

  ngOnInit() {
    this.getAllQuestions();
    this.titl.setTitle('Questions Report');
  }
  public showMod() {
		setTimeout(() => {
			this.myModalHist.show();
		}, 330);
  }
  public hideModal() {
		setTimeout(() => {
			this.myModalHist.hide();
		}, 330);
  }

  async getAllQuestions() {
    this.allQuestions = [];
    try {
      const quest: any = await this.tms.getAllQuestionsOnCompany('no-project');
      if (quest) {
        if (quest.status === 'OK') {
          this.allQuestions = quest.data;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

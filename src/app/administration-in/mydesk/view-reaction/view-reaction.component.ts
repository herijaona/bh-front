import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../../globals/globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'view-reaction',
  templateUrl: './view-reaction.component.html',
  styleUrls: ['./view-reaction.component.scss'],
})
export class ViewReactionComponent implements OnInit {
  public responseForm: FormGroup;
  private itemTOReply: any;
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  public viewreaction_page = 'viewreaction_page';
  public allQuestions: any = [];
  constructor(private tms: TeamsService, private titl: Title, public g: Globals) {
    this.responseForm = new FormGroup({ respValue: new FormControl('', [Validators.required]) });
  }

  ngOnInit() {
    this.getAllQuestions();
    this.titl.setTitle('Questions Report');
  }
  public showMod(item) {
    this.itemTOReply = item;
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

  async sendQReply() {
    try {
      const dsend = {
        qID: this.itemTOReply._id,
        response_value: this.responseForm.value.respValue,
      };
      const respRes = await this.tms.sendResponseTOQuestions(dsend);
      if (respRes['status'] === 'OK') {
        this.hideModal();
      }
    } catch (e) {
      console.log(e);
    }
    console.log(this.itemTOReply, this.responseForm.value);
  }

  async archivequestions(item, indx) {
    console.log(indx);
    try {
      const archResp = await this.tms.archiveQuestions(item._id);
      console.log("archiv",archResp);
      if (archResp['status'] === 'OK') {
        this.allQuestions.splice(indx, 1);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

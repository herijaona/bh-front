import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../../globals/globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {
  constructor(private tms: TeamsService, public g: Globals) { }
  public allQuestions: any = [];
  ngOnInit() {
    this.getAllQuestions();
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

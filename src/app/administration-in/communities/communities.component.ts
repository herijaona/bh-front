import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from './../../globals/globals';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from '../../services/teams/teams.service';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  public img_a: string;
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  public newCommForm: FormGroup;
  constructor(public g: Globals) {}
  ngOnInit() {
    this.newCommForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
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
}

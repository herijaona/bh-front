import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { Globals } from '../../../globals/globals';
import { TeamsService } from '../../../services/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-community-space',
  templateUrl: './community-space.component.html',
  styleUrls: ['./community-space.component.scss'],
})
export class CommunitySpaceComponent implements OnInit {
  public newSubjectForm: FormGroup;
  allSubjetcs = [];
  public img_avatar: string;
  public currCOMMID = '';
  @ViewChild('modalSet') public myModalHist: ModalDirective;
  constructor(public activRoute: ActivatedRoute, public g: Globals, private tms: TeamsService) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }

  ngOnInit() {
    this.activRoute.params.subscribe((params_: any) => {
      this.currCOMMID = params_['id_project'];
      if (this.currCOMMID) {
        this.getSubjectsList();
        this.getUserCommList();
      }
    });
    this.newSubjectForm = new FormGroup({
      subjectName: new FormControl('', [Validators.required]),
      subjectContent: new FormControl('', [Validators.required]),
    });
  }

  async getSubjectsList() {
    try {
      const rs = this.tms.getCOMMSUbjectsList({ commID: this.currCOMMID });
      if (rs['status'] === 'OK') {
        this.allSubjetcs = rs['data'];
      }
    } catch (e) {}
  }
  async getUserCommList() {}

  public showModal() {
    this.newSubjectForm.reset();
    setTimeout(() => {
      this.myModalHist.show();
    }, 2000);
  }

  onChange(event) {}
  onEditorChange(event) {}
  onReady(event) {}

  async saveAndSendSubject() {
    if (!this.newSubjectForm.valid) {
      return;
    }
    const saveRes = await this.tms.saveNewSubjectCommunity({
      name: this.newSubjectForm.value.subjectName,
      subject: this.newSubjectForm.value.subjectContent,
      communitiesID: this.currCOMMID,
    });
    if (saveRes['status'] === 'OK') {
      console.log(saveRes);
    }
  }
  icheckChange() {
    return true;
  }
}

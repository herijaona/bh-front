import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHttpService } from '../base-http/base-http.service';
import { SharedNotificationService } from '../shared-notification/shared-notification.service';
import { Globals } from './../../globals/globals';
import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';

@Injectable()
export class TeamsService extends BaseHttpService {
  constructor(public http: HttpClient, public g: Globals, public sh: SharedNotificationService) {
    super(http, g, sh);
  }

  teamFrontSaveData(arg: any) {
    return this.fetch('post', 'team_front_video', arg).toPromise();
  }

  teamFrontGetData(arg: any) {
    return this.fetch('get', 'team_front_video', {
      company_slug: arg,
    }).toPromise();
  }

  deleteTmV(arg) {
    return this.fetch('delete', 'team_front_video', {
      tm_video_id: arg,
    }).toPromise();
  }

  updatetmvData(arg) {
    return this.fetch('put', 'team_front_video', arg).toPromise();
  }

  public inviteTeam(da) {
    return this.fetch('post', 'invite-in-team', da).toPromise();
  }

  public getTeamUsers(slug) {
    return this.fetch('get', 'teams-users', {
      company_slug: slug,
    }).toPromise();
  }

  public getUsersTeamsNameFn(arg1, arg2) {
    return this.fetch('get', 'team-details', { id_user: arg1, accountID: arg2 }).toPromise();
  }

  public questionsSendData(arg) {
    return this.fetch('post', 'question-data', arg).toPromise();
  }

  public getTeamData() {
    return this.fetch('get', 'teamsUsers').toPromise();
  }

  public changeRoleAdmin(arg) {
    return this.fetch('put', 'change_roleAdm', arg).toPromise();
  }

  public deleteFromTeamList(arg) {
    return this.fetch('delete', 'delete-from-team', arg).toPromise();
  }

  public getCommunityData() {
    return this.fetch('get', 'getAccountCommunity').toPromise();
  }

  public getAllQuestionsOnCompany(type) {
    return this.fetch('get', 'getallCompanyQuestions', {
      qtype: type,
    }).toPromise();
  }
  public archiveQuestions(idQ) {
    return this.fetch('post', 'archives_questions', { idQ: idQ }).toPromise();
  }
  public sendResponseTOQuestions(arg) {
    return this.fetch('post', 'reply_questions', arg).toPromise();
  }
  public getDetailsOnQuestion(qID) {
    return this.fetch('get', 'getDetailOnQuestion', {
      qID: qID,
    }).toPromise();
  }

  public getAllInvitationSent() {
    return this.fetch('get', 'getInvitationSent').toPromise();
  }
  public reviveInvitation(invID) {
    return this.fetch('post', 'revive-invitation', { invID: invID }).toPromise();
  }
}

import { Component, OnInit } from '@angular/core';
import { Globals } from './../../globals/globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { TeamsService } from '../../services/teams/teams.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}

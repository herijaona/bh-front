import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals/globals';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.scss']
})
export class ListCompaniesComponent implements OnInit {

  constructor(public g:Globals) { }

  ngOnInit() {
  }

}

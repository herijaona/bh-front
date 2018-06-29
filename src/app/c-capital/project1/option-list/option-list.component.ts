import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../../globals/globals';
import { ProjectsService } from '../../../services/projects/projects.service';
import { AuthserviceService } from '../../../services/authservice/authservice.service';

@Component({
  selector: 'option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {
  collabType: any;
  countries: any;
  @Output()
  countrySelect = new EventEmitter(); 
  @Output() 
  collabSelect = new EventEmitter(); 
  @Output() 
  activitySelect = new EventEmitter(); 
  
  constructor(private globals: Globals, 
    private project: ProjectsService,
    private auth: AuthserviceService) { }

  async ngOnInit() {
    this.collabType = this.globals.getConfig('collab_types');
    this.countries = await this.project.getCountryHasCollab();
    this.countries = this.countries.data;
  }

  changeCountry(event: any) {
    if(this.auth.isLoggedIn())
    this.countrySelect.emit(event.target.value);
    else 
    this.affichageAlert(); 
  }
  changeCollab(event: any) {
    if(this.auth.isLoggedIn())
    this.collabSelect.emit(event.target.value);
    else 
    this.affichageAlert(); 
  }
  changeActivity(event: any) {
    if(this.auth.isLoggedIn())
    this.activitySelect.emit(event.target.value);
    else 
    this.affichageAlert(); 
  }
  affichageAlert() {
    alert('Veuillez vous s\'authentifier d\'abord ou s\'inscrire');
  }
}

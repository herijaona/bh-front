import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { IdeasComponent } from './ideas/ideas/ideas.component';
import { MindsetComponent } from './mindset/mindset/mindset.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { DescriptionProjectComponent } from './description-project/description-project/description-project.component';
import { TeamComponent } from './team/team/team.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes:Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'mindset', component:MindsetComponent },
  { path: 'team', component:TeamComponent },
  { path: 'projects', component:ProjectsComponent },
  { path: 'description-project', component:DescriptionProjectComponent },
  { path: 'ideas', component:IdeasComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MindsetComponent,
    HomepageComponent,
    TeamComponent,
    ProjectsComponent,
    IdeasComponent,
    DescriptionProjectComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
    exports: [RouterModule],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

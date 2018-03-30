import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { MindsetComponent } from './mindset/mindset/mindset.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';

const routes:Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'mindset', component:MindsetComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MindsetComponent,
    HomepageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
    exports: [RouterModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

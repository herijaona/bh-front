import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HomesliderComponent } from './homeslider/homeslider.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomepageComponent, HomesliderComponent],
  exports: [ HomepageComponent ]
})
export class HomepageModule { }

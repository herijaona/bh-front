import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import {NgxSliderModule} from 'ngx-agile-slider.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TeamComponent]
})
export class TeamModule { }

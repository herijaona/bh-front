import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MindsetComponent } from './mindset/mindset.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule
  ],
  declarations: [MindsetComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MindsetModule { }

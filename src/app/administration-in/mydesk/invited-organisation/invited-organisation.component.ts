import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-invited-organisation',
  templateUrl: './invited-organisation.component.html',
  styleUrls: ['./invited-organisation.component.scss']
})
export class InvitedOrganisationComponent implements OnInit {
  public invoiceForm: FormGroup;
  public itemrow: any;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });
  }

  initItemRows() {
    return this._fb.group({
      itemname: ['']
    });
  }

  addNewRow() {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.push(this.initItemRows());

  }
  deleteRow(index: number) {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.removeAt(index);
  }
  getcontrols() {
    return this.invoiceForm.controls.itemRows['controls'];
  }

}

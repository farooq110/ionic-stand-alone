import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormFields } from 'src/app/common/enum';

@Component({
  selector: 'app-form-field-creator',
  templateUrl: './form-field-creator.component.html',
  styleUrls: ['./form-field-creator.component.scss'],
})
export class FormFieldCreatorComponent implements OnInit {
  formFields = FormFields;
  @Input() fieldType = 'input';
  @Input() formData = {};
  @Input() formC = '';
  @Output() ganaricChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  valueChange(data: any) {
    console.log();
    this.ganaricChange.emit(data);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormFields } from 'src/app/common/enum';
import { BaseRadioComponent } from '../base-radio/base-radio.component';
import { BaseSelectComponent } from '../base-select/base-select.component';
import { BaseSliderComponent } from '../base-slider/base-slider.component';
import { NgSwitch } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-form-field-creator',
  templateUrl: './form-field-creator.component.html',
  styleUrls: ['./form-field-creator.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgSwitch,
    BaseRadioComponent,
    BaseSelectComponent,
    BaseSliderComponent,
  ],
})
export class FormFieldCreatorComponent implements OnInit {
  formFields = FormFields;
  @Input() fieldType: any = FormFields.range;
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

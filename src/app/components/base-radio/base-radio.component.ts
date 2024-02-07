import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-base-radio',
  templateUrl: './base-radio.component.html',
  styleUrls: ['./base-radio.component.scss'],
})
export class BaseRadioComponent implements OnInit {
  @Input() formData: any = {};
  options: any = [];
  selectedOption = '';
  @Output() selectedChange = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    console.log('radio control');
    this.options = this.formData.options;
  }

  compareWith(o1: any, o2: any) {
    return o1 === o2;
  }

  handleChange(ev: any) {
    this.selectedOption = ev.target.value;
    const returnObj = this.options.find(
      (option: any) => this.selectedOption == option.option_id.option_id
    );
    const modifyObj = {
      question_id: returnObj.question_id.question_id,
      options: [returnObj.option_id.option_id],
      type: 'radio',
    };
    this.selectedChange.emit(modifyObj);
  }
}

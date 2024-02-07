import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-base-slider',
  templateUrl: './base-slider.component.html',
  styleUrls: ['./base-slider.component.scss'],
})
export class BaseSliderComponent implements OnInit {
  sliderColor: string = 'slider-red';
  @Input() formData: any = {};
  sliderInput: any = 0;
  max = 10;
  min = 0;
  setClass: any = {
    [this.sliderColor]: true,
  };
  @Output() selectedChange = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    this.min = this.formData.range_start;
    this.max = this.formData.range_end;
    this.setSliderColor(this.sliderInput);
  }

  onValueChange(data: any) {
    let value = data?.target?.value;
    this.sliderInput = value;
    this.setSliderColor(value);
    const modifyObj = {
      question_id: this.formData.question_id,
      range_value: parseInt(this.sliderInput),
      type: 'range',
    };
    this.selectedChange.emit(modifyObj);
  }

  setSliderColor(value: number) {
    let color = '';
    if (value <= 3) {
      color = 'slider-red';
    } else if (value >= 4 && value <= 5) {
      color = 'slider-yellow';
    } else {
      color = 'slider-green';
    }
    this.setClass = {
      [color]: true,
    };
  }
}

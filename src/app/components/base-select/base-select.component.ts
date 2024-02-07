import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-base-select',
  templateUrl: './base-select.component.html',
  styleUrls: ['./base-select.component.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule]
})
export class BaseSelectComponent  implements OnInit {
  @Input() formData:any={}
  @Input() formC:any=""
  options:any=[]
  selected=''
  @Output() selectedChange = new EventEmitter<any>();
  constructor() { }

  async ngOnInit() {
    this.options = this.formData.options
  }

  compareWith(o1:any, o2:any) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((o) => o.id === o1.id);
    }

    return o1 === o2;
  }

  handleChange(ev:any) {
    this.selected = ev.target.value
    const returnObj = this.options.find((option:any)=>(this.selected==option.option_id.option_id))
    const modifyObj = {question_id:returnObj.question_id.question_id, options:[returnObj.option_id.option_id], type:"select"}
    this.selectedChange.emit(modifyObj)
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-daily-pulse',
  templateUrl: './daily-pulse.page.html',
  styleUrls: ['./daily-pulse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DailyPulsePage implements OnInit {
// ionicForm!: FormGroup;
fieldType: string = "progress-bar";
questions:any[] =[]
payload:any[]=[]

constructor(
  private appService: AppServiceService,
  private directus: DirectusService,
  // public formBuilder: FormBuilder,
) {
  this.appService.setIsScroll(true)
}

ngOnInit() {
  this.directus.getQuestion().then((data)=>(this.questions=data))
  // this.ionicForm = this.formBuilder.group({
  //   email: [
  //     ""
  //   ],
  // });
}

ngOnDestroy(): void {
  this.appService.destroyAll()
}

async onSubmit(){
  console.log(this.payload,"submit")
  const a = await this.directus.submitAnswers(this.payload)
  console.log(a)
}

handleChange(data:any){
  const ifExist = this.payload.findIndex((el:any)=>(el.question_id==data.question_id))
  if(ifExist!==-1){
    this.payload[ifExist] = data
  }else{
    this.payload.push(data)
  }
}
}

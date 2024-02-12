import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { DirectusService } from 'src/app/services/directus.service';
import { FormFieldCreatorComponent } from 'src/app/components/form-field-creator/form-field-creator.component';
import {
  IonHeader,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-daily-pulse',
  templateUrl: './daily-pulse.page.html',
  styleUrls: ['./daily-pulse.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonButton,
    NgFor,
    FormsModule,
    FormFieldCreatorComponent,
  ],
})
export class DailyPulsePage implements OnInit {
  fieldType: string = 'progress-bar';
  questions: any[] = [];
  payload: any[] = [];

  constructor(
    private appService: AppService,
    private directus: DirectusService
  ) {
    // this.appService.setIsScroll(true);
  }

  ngOnInit() {
    console.log("====================================")
    this.directus.getQuestion().then((data) => {
      console.log(data);
      return (this.questions = data);
    });
  }

  ngOnDestroy(): void {
    this.appService.destroyAll();
  }

  async onSubmit() {
    const expire = await this.directus.refresh()
    console.log(expire,'0000000')
    // console.log(this.payload, 'submit');
    // const a = await this.directus.submitAnswers(this.payload);
    // console.log(a);
  }

  handleChange(data: any) {
    const ifExist = this.payload.findIndex(
      (el: any) => el.question_id == data.question_id
    );
    if (ifExist !== -1) {
      this.payload[ifExist] = data;
    } else {
      this.payload.push(data);
    }
  }
}

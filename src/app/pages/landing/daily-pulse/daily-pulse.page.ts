import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { DirectusService } from 'src/app/services/directus.service';
import { FormFieldCreatorComponent } from 'src/app/components/form-field-creator/form-field-creator.component';

@Component({
  selector: 'app-daily-pulse',
  templateUrl: './daily-pulse.page.html',
  styleUrls: ['./daily-pulse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FormFieldCreatorComponent],
})
export class DailyPulsePage implements OnInit {
  fieldType: string = 'progress-bar';
  questions: any[] = [];
  payload: any[] = [];

  constructor(
    private appService: AppService,
    private directus: DirectusService
  ) {
    this.appService.setIsScroll(true);
  }

  ngOnInit() {
    this.directus.getQuestion().then((data) => {
      console.log(data);
      return (this.questions = data);
    });
  }

  ngOnDestroy(): void {
    this.appService.destroyAll();
  }

  async onSubmit() {
    console.log(this.payload, 'submit');
    const a = await this.directus.submitAnswers(this.payload);
    console.log(a);
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

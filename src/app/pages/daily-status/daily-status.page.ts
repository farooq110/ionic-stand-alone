import { Component, OnInit } from '@angular/core';
// import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonTextarea,
  IonButton,
} from '@ionic/angular/standalone';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-daily-status',
  templateUrl: './daily-status.page.html',
  styleUrls: ['./daily-status.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonSelect,
    IonSelectOption,
    IonRadioGroup,
    IonRadio,
    IonTextarea,
    IonButton,
    FormsModule,
  ],
})
export class DailyStatusPage implements OnInit {
  constructor(
    private appService: AppService,
  ) {
    // this.appService.setIsScroll(true);
  }

  ngOnInit() {}
}

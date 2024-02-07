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

  constructor() { }

  ngOnInit() {
  }

}

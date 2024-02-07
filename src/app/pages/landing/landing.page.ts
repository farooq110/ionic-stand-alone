import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { DirectusService } from 'src/app/services/directus.service';
import { AppService } from 'src/app/services/app.service';
import {
  IonButton,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { menuSharp } from "ionicons/icons";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    IonButton,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class LandingPage implements OnInit {
  isMobileMemuActive = false;
  webSidebarToggle = false;
  scrollY = false;

  constructor(
    private directus: DirectusService,
    private router: Router,
    private platform: Platform,
    private appService: AppService
  ) {
    addIcons({menuSharp})
    this.appService.isScroll$.subscribe((isScroll) => {
      this.scrollY = isScroll;
    });
  }

  ngOnInit() {
    this.toggleMenu(this.platform.width());
  }

  async logout() {
    this.router.navigate(['/login']);
    await this.directus.logout();
  }

  toggleMenu(width: number) {
    if (width > 768) {
      this.isMobileMemuActive = true;
    } else {
      this.isMobileMemuActive = false;
    }
  }

  webMenuSidebarToggleHandler() {
    this.webSidebarToggle = !this.webSidebarToggle;
  }

  @HostListener('window:resize', ['$event'])
  private _onResize(event: any) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }
}

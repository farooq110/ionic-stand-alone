import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { DirectusService } from 'src/app/services/directus.service';
import { AppService } from 'src/app/services/app.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
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

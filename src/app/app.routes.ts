import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage),
    children:[
      {
        path: 'daily-pulse',
        loadComponent: () => import('./pages/landing/daily-pulse/daily-pulse.page').then( m => m.DailyPulsePage)
      }
    ]
  },
  
];

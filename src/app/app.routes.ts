import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.page').then((m) => m.LandingPage),
    children: [
      {
        path: 'daily-pulse',
        loadComponent: () =>
          import('./pages/landing/daily-pulse/daily-pulse.page').then(
            (m) => m.DailyPulsePage
          ),
      },
      {
        path: 'daily-status',
        loadComponent: () => import('./pages/daily-status/daily-status.page').then( m => m.DailyStatusPage)
      },
      {
        path:'',
        redirectTo:"daily-pulse",
        pathMatch:"full"
      }
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  
];

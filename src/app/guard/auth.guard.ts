import { CanActivateFn, Router } from '@angular/router';
import { DirectusService } from '../services/directus.service';
import { inject } from '@angular/core';

const publicRoute =["/login"]

export const authGuard: CanActivateFn =async (route, state) => {
  const directus = inject(DirectusService)
  const router = inject(Router);
  const isLoggedin = directus.isLoggedin()
  if(isLoggedin){
    if(publicRoute.includes(state.url)){
      if(directus.isTokenExpired()){
        const tokens = await directus.refresh()
        if(!tokens){
          router.navigate(['/'])
        }
      }
    }
    return true
  }else{
    return true;
  }
};

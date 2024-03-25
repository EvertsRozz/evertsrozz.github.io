import { Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
  },
  {
    path: 'redirect',
    component: AuthRedirectComponent,
  },
];

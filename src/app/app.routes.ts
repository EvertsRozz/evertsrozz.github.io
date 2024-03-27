import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';

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

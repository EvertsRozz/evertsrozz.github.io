import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./hero/hero.component').then(mod=> mod.HeroComponent)
    }
];

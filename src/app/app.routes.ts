import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
  { 
    path: '**', 
    component: SearchPageComponent
  },
  { 
    path: '',   
    redirectTo: 'search', 
    pathMatch: 'full' },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
];

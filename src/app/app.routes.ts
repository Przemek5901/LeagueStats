import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'profile/:id',
    component: ProfilePageComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: '**',
    component: SearchPageComponent,
  },
];

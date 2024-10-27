import { Routes } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { shortUrlGuard } from './short-url.guard';
import { ShortUrlComponent } from './short-url/short-url.component';
export const routes: Routes = [
  { path: '', component: SearchBarComponent },
  {
    path: ':shortUrl',
    component: ShortUrlComponent,
    canActivate: [shortUrlGuard],
  },
];

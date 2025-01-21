import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { CartsComponent } from './carts/carts.component';
import { ContactComponent } from './contact/contact.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AuthGuardService } from './service/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LogInComponent },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuardService] },
  { path: 'carts', component: CartsComponent, canActivate: [AuthGuardService] },
  { 
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'about', component: AboutPageComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: '**', redirectTo: 'home' } 
];

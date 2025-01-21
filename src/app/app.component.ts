import { Component } from '@angular/core';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./sharepage/footer/footer.component";
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DataserviceService } from './service/dataservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Final-Project';

  cartItemCount = 0;
  constructor(private dataService: DataserviceService) {}

  getCartCount(): number {
    return this.dataService.getCartItems().length;
  }

  

  handleLogout(): void {
    this.cartItemCount = 0;
    
  }
}

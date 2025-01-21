import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent {
  @Input() cartItemCount = 0;

  isCollapsed = true;
  isScrolled = false;
  isLoggedIn = false; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logOut() {
    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    alert('You have successfully logged out!');
    this.router.navigate(['/login']); 
  }

  logIn() {
    this.router.navigate(['/login']); 
  }

  updateCartCount(count: number): void {
    this.cartItemCount = count;
  }
}

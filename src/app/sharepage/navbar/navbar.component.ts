import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Fixed typo from `styleUrl` to `styleUrls`
})
export class NavbarComponent {
  @Input() cartItemCount = 0;

  isCollapsed = true;
  isScrolled = false;
  isLoggedIn = false; // Tracks login status

  constructor(private router: Router) {}

  ngOnInit() {
    // Check login status on initialization
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
    // Clear session data and update login status
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    alert('You have successfully logged out!');
    this.router.navigate(['/login']); // Redirect to the login page
  }

  logIn() {
    this.router.navigate(['/login']); // Redirect to the login page
  }

  updateCartCount(count: number): void {
    this.cartItemCount = count;
  }
}

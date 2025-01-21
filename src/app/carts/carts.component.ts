import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataserviceService } from '../service/dataservice.service';
import { ProductInterface } from '../interfaces/product-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  @Output() updateCartCount = new EventEmitter<number>();
  cartItems: ProductInterface[] = [];
  constructor(private dataService: DataserviceService) {}

  ngOnInit(): void {
    this.cartItems = this.dataService.getCartItems();
    this.emitCartCount();
  }

  getImageUrl(item: ProductInterface): string {
    return `https://placehold.co/400x300/png?text=${encodeURIComponent(item.name)}`;
  }

  removeFromCart(item: ProductInterface): void {
    this.dataService.removeFromCart(item);
    this.cartItems = this.dataService.getCartItems();
    new this.updateCartCount();
  }

  buyNow(item: ProductInterface): void {
    
    console.log('Buying:', item);
  }

  private emitCartCount(): void {
    this.updateCartCount.emit(this.cartItems.length);
  }
}
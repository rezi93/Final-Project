
import { Component } from '@angular/core';
import { DataserviceService } from '../service/dataservice.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../interfaces/product-interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items: ProductInterface[] = [];
  isLoading = true;
  error: string | null = null;
  product:ProductInterface[]=[]
  

  constructor(
    private service: DataserviceService, 
    private router: Router
  ) {
    
  }

  

  ngOnInit() {
    this.getItemsList();
  }

  getItemsList() {
    this.isLoading = true;
    this.service.getItems().subscribe({
      next: (result: ProductInterface[]) => {
        this.items = result;
        this.isLoading = false;
        console.log(this.items);
      },
      error: (error) => {
        this.error = 'Error loading products';
        this.isLoading = false;
        console.error('Error fetching items:', error);
      }
    });
  }

  getImageUrl(item: ProductInterface): string {
    return `https://placehold.co/400x300/png?text=${item.name}`};


    addCart(product: ProductInterface): void {
      this.service.addToCart(product)
      alert("Product successfully add to cart")
      
    }
    

    
}


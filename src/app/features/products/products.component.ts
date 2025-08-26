import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ImageModule } from 'primeng/image';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../services/category/category.service';
import { CategoryRead } from '../../models/categoryRead';
import { BaseFilter } from '../../models/baseFilter';
import { CartService } from '../../services/cart/cart.service';
import { BtcService } from '../../services/Btc/btc.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    ButtonModule,
    InputNumberModule,
    DialogModule,
    CardModule,
    CommonModule,
    ImageModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  btcRate: number =0;
  categories: CategoryRead [] = [];
  filter: BaseFilter;
  selectedCategory: any;

  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private btcService: BtcService,
    private messageService: MessageService
  ){}



  ngOnInit(){
    this.btcService.getBtcRate().subscribe(rate => this.btcRate = rate);
    this.loadCategories();
  }


  loadCategories(){
    this.categoryService.getCategories(this.filter).subscribe({
      next:(res)=>{
        if(res.status === 200){
          this.categories = res.data;
        } 
      }
    })
  }

  addToCart(product: any) {
    if (!product.quantity || product.quantity <= 0) {
    this.messageService.add({ severity: 'warn', summary: 'Quantity Required', detail: `Please choose a quantity for ${product.name}.`});
    return; 
  }

  this.cartService.addItem(product);
  product.quantity = 0;

  this.messageService.add({ severity: 'success', summary: 'Added to Cart', detail: `${product.name} has been added to your cart.`});
  }
}

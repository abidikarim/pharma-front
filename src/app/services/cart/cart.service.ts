import { Injectable } from '@angular/core';
import { OrderItem } from '../../models/orderItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<OrderItem[]>([]);
  items$ = this.itemsSubject.asObservable();
  
  constructor(){}

  getItems(): OrderItem[] {
    return this.itemsSubject.value;
  }
  addItem(product: any) {
    const items = [...this.itemsSubject.value];
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      items.push({ ...product });
    }
    this.itemsSubject.next(items);
  }

  updateItemQuantity(id: number, quantity: number = 0) {
  const items = [...this.itemsSubject.value];
  const item = items.find(i => i.id === id);

  if (item) {
    if (quantity === null || quantity === undefined || quantity === 0 || isNaN(quantity)) {
      return;
    }

    item.quantity = quantity;
  }

  this.itemsSubject.next(items);
}

  removeItem(id: number) {
    const items = this.itemsSubject.value.filter(i => i.id !== id);
    this.itemsSubject.next(items);
  }

  clearCart() {
    this.itemsSubject.next([]);
  }

  getTotalPrice(): number {
    return this.itemsSubject.value.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  }

}

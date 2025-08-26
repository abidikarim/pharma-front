import { Component, HostListener, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Menu, MenuModule } from 'primeng/menu';
import { AuthComponent } from '../../features/auth/auth.component';
import { OrderItem } from '../../models/orderItem';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BtcService } from '../../services/Btc/btc.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-client-header',
  imports: [
    FormsModule,
    AuthComponent,
    CommonModule,
    MenubarModule,
    ButtonModule,
    MenuModule,
    InputNumberModule,
    DialogModule
  ],
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent {
  @ViewChild("userMenu") userMenu!: Menu;
  count: number = 0;
  items: MenuItem[] = [];
  userItems: MenuItem[] = [];
  isLoggedIn: boolean = false;
  cartItems: OrderItem[] = [];
  totalPrice = 0;
  cartVisible = false;
  btcRate: number =0;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private cartService: CartService,
    private btcService: BtcService
  ) { }


  @HostListener('window:scroll')
  onScroll() {
    if (this.userMenu?.visible) {
      this.userMenu.hide();
    }
  }
  
  initItems() {
     this.items = [
      { label: 'Products', icon:"pi pi-shop", routerLink: '/' },
      { label: 'Orders', icon:"pi pi-shopping-cart", routerLink: '/orders', visible:this.isLoggedIn }
    ];

    this.userItems = [
      { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status =>{
      this.isLoggedIn = status;
      this.initItems();
    })
    this.initCart();
    this.btcService.getBtcRate().subscribe(rate => this.btcRate = rate)
  }


  initCart(){
      this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  updateQuantity(item: OrderItem) {
    this.cartService.updateItemQuantity(item.id, item.quantity);
  }

  removeItem(item: OrderItem) {
    this.cartService.removeItem(item.id);
  }

  clearCart(){
    this.cartService.clearCart();
  }
  
  logout() {
   this.authService.logout().subscribe({
    next:(res)=>{
      const success = res.status === 200;
      const msg = success? "success" : "error";
      this.messageService.add({severity:msg, summary:msg, detail:res.message});

      if(success){
        this.authService.setLoginStatus(false);
        sessionStorage.removeItem("isLoggedIn");
      }
    },
    error:(err)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occurred during logout.'});
    }
   })
  }

}

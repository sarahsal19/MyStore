import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { ConfirmationService } from '../../services/confirmation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  
  @Output() onRemoveCartItem: EventEmitter<Product> = new EventEmitter();

  fullName: string = '';

  address: string = '';

  creditCardNumber: string = '';

  products: Product[] = [];

  isEmpty: boolean = true;

  total: number = 0;

  quantity: number = 0;

  onChange = (e: any, product: Product) => {
    this.products = this.cartService.changeInCart(e, product);
    this.total =  this.cartService.getCartAmount(this.products)

    if (this.total === 0) {
      this.isEmpty = true;
    }
  };

  constructor(
    private cartService: CartService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  // onQuantityChange() {
  //   if (this.quantity == 0) {
  //     this.onRemoveCartItem.emit(this.product);
  //   } else {
  //     this.cartService.updateQuantity(this.product, this.quantity);
  //   }
  // }
  ngOnInit(): void {
    this.products = this.cartService.getProductsInCart();

    if (this.products.length !== 0) {
      this.isEmpty = false;
      this.total =  this.cartService.getCartAmount(this.products)
    }
  }



  submitConfirmationForm = () => {
    const paymentInfo = {
      fullName: this.fullName,
      address: this.address,
      creditCardNumber: this.creditCardNumber,
      total: this.total,
    };

    this.confirmationService.addConfirmation(paymentInfo);

    this.fullName = '';
    this.address = '';
    this.creditCardNumber = '';
    this.total = 0;

    this.cartService.clearCart();
    this.router.navigateByUrl('/confirmation');
  };
}

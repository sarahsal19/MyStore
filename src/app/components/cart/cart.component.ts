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

  products: Product[] = [];

  public options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  fullName: string = '';
  address: string = '';
  creditCardNumber: string = '';

  isEmpty: boolean = true;
  inNum: boolean = true;
  total: number = 0;
  quantity: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getProductsInCart();

    if (this.products.length !== 0) {
      this.isEmpty = false;
      this.total =  this.cartService.getCartAmount(this.products)
    }
  }

  onChange = (e: any, product: Product) => {
    this.products = this.cartService.changeInCart(e, product);
    this.total =  this.cartService.getCartAmount(this.products)

    if (this.total === 0) {
      this.isEmpty = true;
    }
  };

  // onQuantityChange() {
  //   if (this.quantity == 0) {
  //     this.onRemoveCartItem.emit(this.product);
  //   } else {
  //     this.cartService.updateQuantity(this.product, this.quantity);
  //   }
  // }

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

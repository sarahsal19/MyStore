import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  public options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public initialOption: number = this.options[0];

  constructor(private router: Router, private cartService: CartService) {
    this.product = new Product()
  }
  
  ngOnInit(): void {}

  public onClickChange = () => {
    this.router.navigateByUrl(`/product/${this.product.name}`);
  };

  public addToCart(product: Product) {
    this.cartService.addToCart(this.initialOption, product);
    alert('Item is added to the cart successfully !');
  }


}

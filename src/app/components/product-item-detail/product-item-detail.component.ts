import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product!: Product;

  public options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public initialOption: number = 1;

  constructor(
    private productsService: ProductsService,
    private router: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get('id') as unknown as number;
    this.productsService.getProductById(id).subscribe((data) => {
      this.product = data as Product;
    });
  }

  public addToCart(product: Product) {
    this.cartService.addToCart(this.initialOption, product);
    alert('Item is added to the cart successfully !');
  }
}

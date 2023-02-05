import { Injectable } from '@angular/core';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  public productListInCart: Product[] = [];

  constructor() {}

  getProductsInCart() {
    return this.productListInCart;
  }

  addToCart(quantity: number, product: Product) {
    const checkProductExist = this.productListInCart.filter(
      (p) => p.id === product.id
    );
    if (checkProductExist.length !== 0) {
      const priorQuantity = parseInt(
        checkProductExist[0]['quantity'] as unknown as string
      );
      const addQuantity =
        priorQuantity + parseInt(quantity as unknown as string);
      checkProductExist[0]['quantity'] = addQuantity;
      this.productListInCart = this.productListInCart
        .filter((p) => p.id !== product.id)
        .concat(checkProductExist);
      return this.productListInCart;
    } else {
      const quantityToInt = parseInt(quantity as unknown as string);
      product['quantity'] = quantityToInt;
      this.productListInCart.push(product);
      return this.productListInCart;
    }
  }

  changeInCart(quantity: number, product: Product) {
    if (quantity == 0) {
      const afterDeleteInCart = this.deleteProduct(product.id);
      alert(`The item will be removed from cart!`);
      return afterDeleteInCart;
    } else {
      this.productListInCart = this.productListInCart.map((p) => {
        if (p.id === product.id) {
          p['quantity'] = parseInt(quantity as unknown as string);
        }
        return p;
      });
      return this.productListInCart;
    }
  }

  getCartAmount(products: Product[] ): number{
   return products.reduce((pre, curr) => {
      const currNum =
        curr.price * parseInt(curr.quantity as unknown as string);
      return pre + currNum;
    }, 0);
  }

  deleteProduct(id: number) {
    this.productListInCart = this.productListInCart.filter(
      (item) => item.id !== id
    );
    return this.productListInCart;
  }

  clearCart() {
    this.productListInCart = [];
    return this.productListInCart;
  }
}

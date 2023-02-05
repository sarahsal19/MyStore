import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public productListInCart: Product[] = [];
  

  getProductsInCart() {
    return this.productListInCart;
  }

  addToCart(quantity: number, product: Product) {
    const existingProduct = this.productListInCart.filter(
      (p) => { return p.id == product.id }
    );
    if (existingProduct.length > 0 ) {
        const newQuantity =
        existingProduct[0].quantity! + parseInt(quantity as unknown as string);

        existingProduct[0]['quantity'] = newQuantity;

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
      this.productListInCart = this.productListInCart.map((prod) => {
        if (prod.id == product.id) {
          prod['quantity'] = quantity;
        }
        return prod;
      });
      return this.productListInCart;
    }
  }

  getCartAmount(products: Product[] ): number{
   return products.reduce((pre, current) => {
      const currentAmount =
      current.price * parseInt(current.quantity as unknown as string);
      let  total: number = pre + currentAmount;
      return total;
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

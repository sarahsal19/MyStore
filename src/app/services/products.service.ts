import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json');
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http
      .get<Product[]>('assets/data.json')
      .pipe(map((products) => products.find((product) => product.id == id)));
  }
}

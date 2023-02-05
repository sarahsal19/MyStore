export class Product {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
  quantity?: number;

  constructor() {
    this.id = -1;
    this.name = '';
    this.description = '';
    this.price = -1;
    this.url = '';
    this.quantity = 0;
  }
}

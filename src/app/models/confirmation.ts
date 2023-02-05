export class PaymentInfo {
  fullName: string;
  address: string;
  creditCardNumber: string;
  total: number;

  constructor() {
    this.fullName = ''
    this.address = ''
    this.creditCardNumber = ''
    this.total = 0
  }
}

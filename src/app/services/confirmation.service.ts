import { Injectable } from '@angular/core';
import { PaymentInfo } from '../models/confirmation';
@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {

  paymentInfo: PaymentInfo = new PaymentInfo()
  
  constructor() {}

  getConfirmation() {
    return this.paymentInfo;
  }

  addConfirmation(confirmedPaymentInfo: PaymentInfo) {
    this.paymentInfo = confirmedPaymentInfo;
    return this.paymentInfo;
  }
}

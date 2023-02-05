import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '../../services/confirmation.service';
import { PaymentInfo } from '../../models/confirmation';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {

  paymentInfo: PaymentInfo = new PaymentInfo()

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
   this.paymentInfo = this.confirmationService.getConfirmation();
  }
}

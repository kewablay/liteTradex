import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { CurrencyPipe } from '@angular/common';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  fee: number;
  status: string;
  gateway: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, TableModule, BadgeModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  transactions: Transaction[] = [
    {
      id: '#1',
      type: 'Deposit',
      amount: 500.0,
      fee: 5.0,
      status: 'Completed',
      gateway: 'Bank',
    },
    {
      id: '#2',
      type: 'Withdrawal',
      amount: 200.0,
      fee: 2.0,
      status: 'Pending',
      gateway: 'PayPal',
    },
    {
      id: '#3',
      type: 'Transfer',
      amount: 150.0,
      fee: 1.5,
      status: 'Completed',
      gateway: 'Stripe',
    },

  ];

  // transactions: Transaction[] = [];
}

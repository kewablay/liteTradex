import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user-service/user.service';

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
  imports: [CardComponent, TableModule, BadgeModule, CurrencyPipe, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  currentUser$!: Observable<DocumentData | undefined>;
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

  constructor(private userService: UserService) {}

  ngOninit(): void {
    this.currentUser$ = this.userService.getUserById(
      this.userService.getCurrentUserId()
    );
  }

  // transactions: Transaction[] = [];
}

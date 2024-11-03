import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user-service/user.service';
import { WithdrawalService } from '../../../services/withdrawal-service/withdrawal.service';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
  imports: [
    CardComponent,
    TableModule,
    BadgeModule,
    CurrencyPipe,
    AsyncPipe,
    AsyncPipe,
    DatePipe,
    ProgressSpinnerModule, 
    SkeletonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  user$!: Observable<DocumentData | undefined>;
  withdrawalRequests$!: Observable<DocumentData[]>;
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

  constructor(
    private userService: UserService,
    private withdrawalService: WithdrawalService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUserById(
      this.userService.getCurrentUserId()
    );

    this.withdrawalRequests$ = this.withdrawalService.getWithdrawalsByUserId(
      this.userService.getCurrentUserId() as string
    );
  }

  // transactions: Transaction[] = [];
}

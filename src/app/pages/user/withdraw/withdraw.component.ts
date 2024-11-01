import { TitleCasePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WithdrawalService } from '../../../services/withdrawal-service/withdrawal.service';
import { UserService } from '../../../services/user-service/user.service';
import { create } from 'domain';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../utils/notyf.token';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [TitleCasePipe, FormsModule],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.sass',
})
export class WithdrawComponent {
  exchangeName: string = ''; // Default value
  walletAddress: string = ''; // Default value
  amount: number | null = null;
  currency: string = '';
  withdrawLoading: boolean = false;
  user$!: Observable<DocumentData | undefined>;
  currentBalance!: number;

  constructor(
    private withdrawalService: WithdrawalService,
    private userService: UserService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.currency = this.userService.getCurrentUserCurrency();
  }

  ngOnInit() {
    this.user$ = this.userService.getUserById(
      this.userService.getCurrentUserId()
    );
    this.user$.subscribe((user) => {
      if (user) {
        this.currentBalance = Number(user['balance']['mainWallet']['amount']);
      }
    });
  }

  checkValidation() {
    if (
      this.exchangeName === '' ||
      this.walletAddress === '' ||
      this.amount === null
    ) {
      return false;
    } else if (this.amount > this.currentBalance) {
      this.notyf.error('Insufficient balance');
      return false;
    }
    return true;
  }

  resetFormFields() {
    this.exchangeName = '';
    this.walletAddress = '';
    this.amount = null;
  }

  handleWithdraw() {
    if (!this.checkValidation()) {
      return;
    }

    this.withdrawLoading = true;

    const withdrawalData = {
      exchangeName: this.exchangeName,
      walletAddress: this.walletAddress,
      amount: this.amount,
      userId: this.userService.getCurrentUserId(),
      status: 'pending',
      currency: this.currency,
      createdAt: new Date().toISOString(),
    };
    this.withdrawalService.createWithdrawal(withdrawalData).subscribe({
      next: (withdrawal) => {
        this.withdrawLoading = false;
        console.log('Withdrawal created successfully:', withdrawal);
        this.notyf.success('Withdrawal request submitted');
        this.resetFormFields();
        this.router.navigate(['/dashboard/home']);
      },
      error: (error) => {
        this.withdrawLoading = false;
        console.error('Error creating withdrawal:', error);
        this.notyf.error(error.message);
        this.resetFormFields();
      },
    });
  }
}

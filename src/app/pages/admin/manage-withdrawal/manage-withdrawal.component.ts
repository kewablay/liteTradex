import { Component, Inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { WithdrawalService } from '../../../services/withdrawal-service/withdrawal.service';
import { AsyncPipe } from '@angular/common';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../utils/notyf.token';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-manage-withdrawal',
  standalone: true,
  imports: [
    TableModule,
    AvatarModule,
    ButtonModule,
    ConfirmDialogModule,
    AsyncPipe,
    ProgressSpinnerModule,
  ],
  templateUrl: './manage-withdrawal.component.html',
  styleUrl: './manage-withdrawal.component.sass',
})
export class ManageWithdrawalComponent {
  withdrawalRequests!: Observable<DocumentData[]>;

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private withdrawalService: WithdrawalService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  confirmRejectWithdrawal(
    user: string,
    amount: string,
    currency: string,
    withdrawalId: string,
    status: string
  ) {
    this.confirmationService.confirm({
      header: 'Reject Withdrawal',
      message: `Are you sure you want to reject withdrawal of "${currency} ${amount}" from "${user}" ? This action cannot be undone.`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'btn btn-secondary-light',
      acceptButtonStyleClass: 'btn btn-warning',
      accept: () => {
        // delete user
        // show toast notification for deletion status
        // this.router.navigate(['/admin/manage-withdrawal']);
        if (status === 'approved') {
          this.notyf.error('Withdrawal already approved');
          return;
        }
        this.withdrawalService
          .updateWithdrawalStatus(withdrawalId, 'rejected')
          .subscribe({
            next: () => {
              this.notyf.success('Withdrawal rejected successfully');
            },
            error: (error: Error) => {
              this.notyf.error(error.message);
            },
          });
      },
      // reject: () => {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Rejected',
      //     detail: 'You have rejected',
      //     life: 2000,
      //   });
      // },
    });
  }
  confirmApproveWithdrawal(
    user: string,
    amount: string,
    currency: string,
    withdrawalId: string,
    userId: string
  ) {
    this.confirmationService.confirm({
      header: 'Approve Withdrawal',
      message: `Are you sure you want to approve withdrawal of "${currency} ${amount}" from "${user}" ? This action cannot be undone.`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'btn btn-secondary-light',
      acceptButtonStyleClass: 'btn btn-success',
      accept: () => {
        // delete user
        // show toast notification for deletion status
        // this.router.navigate(['/admin/manage-withdrawal']);
        this.withdrawalService
          .approveWithdrawal(withdrawalId, userId, amount)
          .subscribe({
            next: () => {
              this.notyf.success('Withdrawal approved');
            },
            error: (error: Error) => {
              this.notyf.error(error.message);
            },
          });
      },
      // reject: () => {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Rejected',
      //     detail: 'You have rejected',
      //     life: 2000,
      //   });
      // },
    });
  }

  confirmDeleteWithdrawal(
    user: string,
    amount: string,
    currency: string,
    withdrawalId: string
  ) {
    this.confirmationService.confirm({
      header: 'Delete Withdrawal',
      message: `Are you sure you want to delete withdrawal of "${currency} ${amount}" from "${user}" ? This action cannot be undone.`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'btn btn-secondary-light',
      acceptButtonStyleClass: 'btn btn-warning',
      accept: () => {
        // delete user
        // show toast notification for deletion status
        // this.router.navigate(['/admin/manage-withdrawal']);
        this.handleDelete(withdrawalId);
      },
      // reject: () => {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Rejected',
      //     detail: 'You have rejected',
      //     life: 2000,
      //   });
      // },
    });
  }

  handleDelete(withdrawalId: string) {
    this.withdrawalService.deleteWithdrawal(withdrawalId).subscribe({
      next: () => {
        this.notyf.success('Withdrawal deleted.');
      },
      error: (error: Error) => {
        this.notyf.error(error.message);
      },
    });
  }

  ngOnInit() {
    this.withdrawalRequests = this.withdrawalService.getWithdrawals();
  }
}

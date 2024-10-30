import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-manage-withdrawal',
  standalone: true,
  imports: [TableModule, AvatarModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './manage-withdrawal.component.html',
  styleUrl: './manage-withdrawal.component.sass',
})
export class ManageWithdrawalComponent {
  withdrawalRequests = [
    {
      id: 1,
      name: 'John Doe',
      email: 'yqB5m@example.com',
      walletAddress: '0x1234567890',
      amount: 1000,
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'TtD3G@example.com',
      walletAddress: '0x9876543210',
      amount: 2000,
      status: 'Approved',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      walletAddress: '0x3456789012',
      email: 'Jpj9O@example.com',
      amount: 3000,
      status: 'Declined',
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  confirmRejectWithdrawal(user: string, amount: string) {
    this.confirmationService.confirm({
      header: 'Reject Withdrawal',
      message: `Are you sure you want to reject withdrawal of "$${amount}" from "${user}" ? This action cannot be undone.`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'btn btn-secondary-light',
      acceptButtonStyleClass: 'btn btn-warning',
      accept: () => {
        // delete user
        // show toast notification for deletion status
        // this.router.navigate(['/admin/manage-withdrawal']);
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
  confirmApproveWithdrawal(user: string, amount: string) {
    this.confirmationService.confirm({
      header: 'Approve Withdrawal',
      message: `Are you sure you want to approve withdrawal of "$${amount}" from "${user}" ? This action cannot be undone.`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'btn btn-secondary-light',
      acceptButtonStyleClass: 'btn btn-success',
      accept: () => {
        // delete user
        // show toast notification for deletion status
        // this.router.navigate(['/admin/manage-withdrawal']);
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
}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    AvatarModule,
    ConfirmDialogModule,
    RouterLink,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.sass',
})
export class UserManagementComponent {
  users = [
    {
      id: 1,
      name: 'Laurene Jay',
      email: 'laureneJay@gmail.com',
      avatarLabel: 'L',
    },
    {
      id: 2,
      name: 'Michael Smith',
      email: 'michaelSmith@example.com',
      avatarLabel: 'M',
    },
    {
      id: 3,
      name: 'Sarah Connor',
      email: 'sarahConnor@example.com',
      avatarLabel: 'S',
    },
    {
      id: 4,
      name: 'Emma Stone',
      email: 'emmaStone@example.com',
      avatarLabel: 'E',
    },
    {
      id: 5,
      name: 'John Doe',
      email: 'johnDoe@example.com',
      avatarLabel: 'J',
    },
  ];

  constructor(private confirmationService: ConfirmationService, private router: Router) {}

  confirmDelete(user: string) {
    this.confirmationService.confirm({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete user "${user}" ? This action cannot be undone.`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'btn btn-secondary-light',
      acceptButtonStyleClass: 'btn btn-warning',
      accept: () => {
        // delete user 
        // show toast notification for deletion status
        this.router.navigate(['/admin/user-management']);
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

  handleEdit(e: Event): void {
    // Open edit Modal
    // Edit user
    e.stopPropagation();
  }

  handleDelete(e: Event, user: string): void {
    e.stopPropagation();
    this.confirmDelete(user);
    // Open confirm delete Modal
    // delte user
  }
}

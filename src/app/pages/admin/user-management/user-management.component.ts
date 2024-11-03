import { Component, Inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { UserService } from '../../../services/user-service/user.service';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../utils/notyf.token';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    AvatarModule,
    ConfirmDialogModule,
    RouterLink,
    AsyncPipe,
    ProgressSpinnerModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.sass',
})
export class UserManagementComponent {
  users$!: Observable<DocumentData[]>;
  @ViewChild('dt') dt!: Table;
  searchTerm: string = '';

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private userService: UserService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.users$ = this.userService.getUsers();
  }

  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(searchValue, 'contains');
  }

  confirmDelete(user: string, userId: string) {
    this.confirmationService.confirm({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete user "${user}" ? This action cannot be undone.`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'btn btn-secondary-light',
      acceptButtonStyleClass: 'btn btn-warning',
      accept: () => {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.router.navigate(['/admin/user-management']);
            this.notyf.success('User deleted successfully');
          },
          error: (error: Error) => {
            this.notyf.error(error.message);
          },
        });
      },
    });
  }

  handleEdit(e: Event): void {
    e.stopPropagation();
  }

  handleDelete(e: Event, user: string, userId: string): void {
    e.stopPropagation();
    this.confirmDelete(user, userId);
  }
}
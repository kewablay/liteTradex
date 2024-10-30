import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [TableModule, ButtonModule, AvatarModule, RouterLink],
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

  handleEdit(e:Event): void {
    // Open edit Modal
    // Edit user
    e.stopPropagation()
    
  }

  handleDelete(e:Event): void {
    e.stopPropagation()
    // Open confirm delete Modal
    // delte user
  }
}

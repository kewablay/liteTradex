import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Wallet } from '../../models/app.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../utils/notyf.token';

@Component({
  selector: 'app-balance-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './balance-form.component.html',
  styleUrl: './balance-form.component.sass',
})
export class BalanceFormComponent {
  @Input() dialogType!: string;
  @Input() balance!: Wallet;
  @Input() userId!: string;
  @Output() onClose = new EventEmitter<void>();
  updateBalanceLoading: boolean = false;

  blanceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.blanceForm = this.fb.group({
      amount: ['', Validators.required],
      currency: [''],
    });
  }

  ngOnInit(): void {
    this.blanceForm.patchValue({
      amount: this.balance.amount,
      currency: this.balance.currency,
    });
  }

  onSubmit(): void {
    if (this.blanceForm.valid) {
      // show loading
      this.updateBalanceLoading = true;

      console.log('balance value: ', this.blanceForm.value);
      // this.blanceForm.value();
      if (this.dialogType === 'main-wallet') {
        this.userService
          .updateUserMainBalance(this.userId, this.blanceForm.value)
          .subscribe({
            next: () => {
              this.updateBalanceLoading = false;
              this.notyf.success('Balance updated successfully.');
              this.onClose.emit();
            },
            error: (error: Error) => {
              this.updateBalanceLoading = false;
              this.notyf.error(error);
              console.log("error updating main balance: ", error);
              this.onClose.emit();
            },
          });
        } else if (this.dialogType === 'profit-wallet') {
          this.userService
          .updateUserProfitBalance(this.userId, this.blanceForm.value)
          .subscribe({
            next: () => {
              this.updateBalanceLoading = false;
              this.notyf.success('Balance updated successfully.');
              this.onClose.emit();
            },
            error: (error: Error) => {
              this.updateBalanceLoading = false;
              this.notyf.error(error);
              console.log("error updating profit balance: ", error);
              this.onClose.emit();
            },
          });
      }
    }
  }

  handleClose(): void {
    this.onClose.emit();
  }

  handleEditMainWallet(): void {}

  handleEditProfitWallet(): void {}
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWithdrawalComponent } from './manage-withdrawal.component';

describe('ManageWithdrawalComponent', () => {
  let component: ManageWithdrawalComponent;
  let fixture: ComponentFixture<ManageWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageWithdrawalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

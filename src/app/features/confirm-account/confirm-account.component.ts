import { Component } from '@angular/core';
import { ConfirmAccount } from '../../models/confirmAccount';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { timer } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-confirm-account',
  imports: [
    ProgressBarModule,
    ButtonModule,
    CommonModule,
    CardModule,
    RouterLink
  ],
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.css'
})
export class ConfirmAccountComponent {
 confirmationStatus: 'loading' | 'success' | 'error' = 'loading';
  confirmAccount?: ConfirmAccount;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.confirmAccount = {
      confirmation_code: this.activatedRoute.snapshot.queryParamMap.get("code") as string,
    }
  }
  ngOnInit() {
    this.authService.confirmAccount(this.confirmAccount as ConfirmAccount).subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.confirmationStatus = "success"
          timer(2000).subscribe(() => {
            this.router.navigate(['/'])
          })
        } else {
          this.confirmationStatus = "error"
        }
      },
      error: (error) => {
        this.confirmationStatus = "error"
      }
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FormErrorComponent } from '../form-error/form-error.component';
import { passwordMatchValidator } from '../../validators/passwordMatch';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from '../../models/resetPassword';
import { deepCopy } from '../../utilities/deepCopy';
import { timer } from 'rxjs';
@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    FormErrorComponent,
    CardModule,
    ButtonModule,
    PasswordModule,
    FloatLabelModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  confirmation_code?:string;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.resetForm = this.fb.group({
      password:['',[Validators.required]],
      confirm_password:['',[Validators.required]]
    },{ validators: passwordMatchValidator })
  }

ngOnInit() {
   this.confirmation_code =  this.activatedRoute.snapshot.queryParamMap.get("code") as string;
}


 onSavePassword(){
  if(this.resetForm.invalid){
    this.resetForm.markAllAsTouched();
    return;
  }
  this.loading= true;
  const reset_data: ResetPassword = deepCopy(this.resetForm.value);
  reset_data.confirmation_code = this.confirmation_code;

  this.authService.resetPassword(reset_data).subscribe({
    next:(res)=>{
      this.loading= false;
      const success= res.status === 200;
      const msg= success? 'success' : 'error';
      this.messageService.add({severity: msg, summary: msg, detail: res.message});
      
      if(success){
        timer(2000).subscribe(()=>{
          this.router.navigate(['/']);
        })
      }
    },

    error:(err)=>{
      this.loading= false;
      this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occurred during reset password.'});
    }
  })
 }
}

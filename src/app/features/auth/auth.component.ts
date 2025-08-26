import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator } from '../../validators/passwordMatch';
import { emailValidator } from '../../validators/emailValidator';
import { deepCopy } from '../../utilities/deepCopy';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../form-error/form-error.component';
import { ForgetPassword } from '../../models/forgetPassword';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormErrorComponent,
    DialogModule, 
    TabViewModule, 
    InputTextModule, 
    PasswordModule, 
    ButtonModule, 
    FormsModule,
    FloatLabelModule
  ],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  visible: boolean = false;
  activeIndex: number = 0;
  loginForm!:FormGroup;
  registerForm!:FormGroup; 
  resetEmailForm!:FormGroup;
  loading: boolean = false;
  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ){

    this.loginForm = this.fb.group({
      email:['',[Validators.required,emailValidator]],
      password:['',[Validators.required]]
    });

    this.registerForm = this.fb.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required,emailValidator]],
      password:['',[Validators.required]],
      confirm_password:['',[Validators.required]]
    }, { validators: passwordMatchValidator });   

    this.resetEmailForm = this.fb.group({
      email:['',[Validators.required,emailValidator]]
      });
  }

  openDialog() {
    this.visible = true;
  }

  login() {
   if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    return;
   }
   this.loading = true;
   const loginData = deepCopy(this.loginForm.value);

   this.authService.login(loginData).subscribe({
    next:(res)=>{ 
      this.loading=false;     
      const status = res.status === 200;
      const msg = status? "success" : "error"
      this.messageService.add({severity:msg, summary:msg, detail:res.message});

      if(status){
        this.visible = false;
        this.authService.setLoginStatus(true);
        this.loginForm.reset();
      }
    },
    error:(err)=>{
      this.loading= false;
      this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occurred during login.'});
    }
   })
  }

  register() {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading= true;
    const userData = deepCopy(this.registerForm.value);

    this.authService.register(userData).subscribe({
      next:(res)=>{
        this.loading = false;
        const success = res.status === 201;
        const msg = success? "success" : "error";
        this.messageService.add({severity:msg, summary:msg, detail:res.message});
        if(success){
          this.visible = false;
          this.registerForm.reset();
        }
      },
      error:(err)=>{
        this.loading= false;
        this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occurred during register.'});
      }
    })
  }

  sendResetEmail() {
   if(this.resetEmailForm.invalid){
     this.resetEmailForm.markAllAsTouched();
     return;
   }

   this.loading= true;
   const forget_data: ForgetPassword = deepCopy(this.resetEmailForm.value);

   this.authService.forgetPassword(forget_data).subscribe({
    next:(res)=>{
      this.loading= false;
      const success = res.status === 200;
      const msg = success? "success" : "error";
      this.messageService.add({severity:msg, summary:msg, detail:res.message});
      if(success){
        this.visible = false;
      }
    },

    error:(err)=>{
      this.loading= false;
      this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occurred during send mail.'});
    }
   })

  }
}

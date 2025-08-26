import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../models/login';
import { BaseOut } from '../../models/baseOut';
import { UserCreate } from '../../models/userCreate';
import { BehaviorSubject } from 'rxjs';
import { ConfirmAccount } from '../../models/confirmAccount';
import { ForgetPassword } from '../../models/forgetPassword';
import { ResetPassword } from '../../models/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    const saved = sessionStorage.getItem('isLoggedIn') === 'true';
    this.loggedIn.next(saved);

  }

  setLoginStatus(status: boolean) {
    this.loggedIn.next(status);

    if (status) {
      sessionStorage.setItem("isLoggedIn", "true");
    } else {
      sessionStorage.removeItem("isLoggedIn");
    }
  }

  login(loginData: Login) {
    const formData: FormData = new FormData();
    formData.append('username', loginData.email);
    formData.append("password", loginData.password);
    return this.http.post<BaseOut>("/api/auth/login", formData);

  }

  register(userData: UserCreate) {
    return this.http.post<BaseOut>("/api/users", userData);
  }

  logout() {
    return this.http.get<BaseOut>("/api/auth/logout", { withCredentials: true });
  }

  confirmAccount(confirm_data:ConfirmAccount){
      return this.http.patch<BaseOut>("/api/auth/confirm_account",confirm_data);
  }

  forgetPassword(forget_data:ForgetPassword){
    return this.http.post<BaseOut>("/api/auth/forget_password",forget_data);
  }

  resetPassword(reset_data: ResetPassword){
    return this.http.patch<BaseOut>("/api/auth/reset_password",reset_data);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [
    CommonModule
  ],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {
  @Input() control?: AbstractControl;
  @Input() form?: FormGroup;
  @Input() errorKey?: string;

  hasError(): boolean {
    if (this.control) return this.control.touched && this.control.invalid;
    if (this.form && this.errorKey) return this.form.touched && this.form.errors?.[this.errorKey];
    return false;
  }

  errorKeys(): string[] {
    if (this.control?.errors) return Object.keys(this.control.errors);
    if (this.form && this.form.errors && this.errorKey) return [this.errorKey];
    return [];
  }

  getErrorMessage(key: string): string {
    const messages: { [key: string]: string } = {
      required: 'This field is required.',
      invalidEmail: 'Invalid email format.',
      passwordsMismatch: 'Passwords do not match.'
    };
    return messages[key] || 'Invalid field';
  }
}

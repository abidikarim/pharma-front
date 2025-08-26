import { AbstractControl, ValidationErrors} from '@angular/forms';
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (value && !emailRegex.test(value)) {
    return { invalidEmail: true };
  }
  return null;
}
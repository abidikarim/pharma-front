import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
const password = group.get('password')?.value;
  const confirm_password = group.get('confirm_password')?.value;
  if (password && confirm_password && password !== confirm_password) {
    return { passwordsMismatch: true };
  }
  return null;
};

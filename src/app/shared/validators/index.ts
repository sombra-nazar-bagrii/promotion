import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function EmailFormatValidator(control: AbstractControl) {
  const { value } = control;
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/;
  const valid = !value?.trim() || regex.test(value);

  return valid ? null : { emailFormat: true };
}

export function PhoneFormatValidator(control: AbstractControl) {
  const { value } = control;
  const regex = /^[+0-9 -]*$/;
  const valid = !value?.trim() || regex.test(value);

  return valid ? null : { phoneFormat: true };
}

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup): ValidatorFn => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors?.['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}


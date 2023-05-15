import { FormGroup, FormControl } from '@angular/forms';
import {
  EmailFormatValidator,
  PhoneFormatValidator,
  ConfirmPasswordValidator
} from './index';

describe('Validators', () => {
  describe('EmailFormatValidator', () => {
    it('should return null for empty value', () => {
      const control = new FormControl('');
      const result = EmailFormatValidator(control);
      expect(result).toBeNull();
    });

    it('should return null for valid email', () => {
      const control = new FormControl('test@example.com');
      const result = EmailFormatValidator(control);
      expect(result).toBeNull();
    });

    it('should return validation error for invalid email', () => {
      const control = new FormControl('invalid_email');
      const result = EmailFormatValidator(control);
      expect(result).toEqual({ emailFormat: true });
    });
  });

  describe('PhoneFormatValidator', () => {
    it('should return null for empty value', () => {
      const control = new FormControl('');
      const result = PhoneFormatValidator(control);
      expect(result).toBeNull();
    });

    it('should return null for valid phone number', () => {
      const control = new FormControl('+1234567890');
      const result = PhoneFormatValidator(control);
      expect(result).toBeNull();
    });

    it('should return validation error for invalid phone number', () => {
      const control = new FormControl('invalid_phone');
      const result = PhoneFormatValidator(control);
      expect(result).toEqual({ phoneFormat: true });
    });
  });

  describe('ConfirmPasswordValidator', () => {
    let formGroup: FormGroup;

    beforeEach(() => {
      formGroup = new FormGroup({
        password: new FormControl('password123'),
        confirmPassword: new FormControl('')
      });
    });

    it('should return null when passwords match', () => {
      formGroup.controls.confirmPassword.setValue('password123');
      const validatorFn = ConfirmPasswordValidator('password', 'confirmPassword');
      validatorFn(formGroup);
      expect(formGroup.controls.confirmPassword.errors).toBeNull();
    });

    it('should set validation error when passwords do not match', () => {
      formGroup.controls.confirmPassword.setValue('different_password');
      const validatorFn = ConfirmPasswordValidator('password', 'confirmPassword');
      validatorFn(formGroup);
      expect(formGroup.controls.confirmPassword.errors).toEqual({ confirmedValidator: true });
    });

    it('should return null when matching control has existing errors', () => {
      formGroup.controls.confirmPassword.setValue('password123');
      formGroup.controls.confirmPassword.setErrors({ required: true });
      const validatorFn = ConfirmPasswordValidator('password', 'confirmPassword');
      const result = validatorFn(formGroup);
      expect(result).toBeNull();
    });
  });
});

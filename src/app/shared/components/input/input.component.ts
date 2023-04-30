import {
  Component,
  Input,
  Self,
  Optional
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'promo-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  public label: string;

  @Input()
  public placeholder: string;

  @Input()
  public required = false;

  @Input()
  public disabled = false;

  @Input()
  public data: string;

  @Input()
  public minlength = 0;

  // private errorMessages = new Map<string, () => string>();

  public onChangeFn = (_: any) => {
  };

  public onTouchedFn = () => {
  };

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
    // this.errorMessages.set('required', () => `${this.label} is required.`);
    // this.errorMessages.set('minlength', () => `The no. of characters should not be less than ${this.minlength}.`);
  }

  public get invalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;
    return this.invalid ? (dirty || touched) : false;
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.data = obj;
  }

  public onChange() {
    this.onChangeFn(this.data);
  }
}

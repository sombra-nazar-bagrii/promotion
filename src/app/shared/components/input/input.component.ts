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

  @Input() label: string;
  @Input() placeholder: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() data: string;
  @Input() minlength = 0;
  @Input() prefix = false;

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
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

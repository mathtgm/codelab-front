import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, Input } from '@angular/core';
import { IFormField } from '../../interfaces/form-field.interface';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IMaskModule } from 'angular-imask';
import { CommonModule } from '@angular/common';
import { controlErrorMessages } from '../../helpers/form-error.helper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

const form = [ReactiveFormsModule, FormsModule];
const components = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@Component({
  selector: 'cl-form-field',
  standalone: true,
  imports: [...form, ...components, IMaskModule, CommonModule],
  providers: [MatDatepickerModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input({ required: true }) field!: IFormField;
  @Input({ required: true }) form!: FormGroup;

  get control(): AbstractControl | null {
    if (!this.field || !this.form) return null;

    return this.form.get(this.field.formControlName);
  }

  get label(): string {
    const isRequired = !!this.control?.hasValidator(Validators.required);
    return `${this.field.label}${isRequired ? ' *' : ''}`;
  }

  get error(): string {
    if (!this.control || !this.control.touched) return '';

    return controlErrorMessages(this.control);
  }
}

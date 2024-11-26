import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const lettersAndSpacesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const regex = /^[a-zA-Z\s]*$/;
  if (!regex.test(control.value)) {
    return { invalidCharacters: true };
  }
  return null;
};

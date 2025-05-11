import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {
  //Espresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string) {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min} caracteres.`;

        case 'email':
          return `El valor ingresado no es un correo electrónico.`;


        case 'emailTaken':
          return `El correo electrónico ya esta siendo usado por otro usuario.`;

        case 'noStrider':
          return `No se puede usar el username de strider en la app`;

        case 'pattern':
          if (errors['pattern'].requiredPattern == FormUtils.emailPattern) {
            return 'El correo electrónico no es permitido';
          }
          return 'Error de patròn contra expresión regular';

        default:
          return `Error de validación no encontrado ${key}`;
      }
    }
    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.get(fieldName)?.errors ?? {};
    return this.getTextError(errors);
  }

  static isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};
    return this.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordNotEqual: true };
    };
  }

  static async chekingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {

    await sleep();
    console.log('Validando servidors');
    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }
    return null;
  }

  static notStrider (control: AbstractControl){
    const value = control.value;

    return value === 'strider' ? { noStrider: true} : null;
  }
}

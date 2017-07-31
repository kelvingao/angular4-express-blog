import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styles:[`
      .error {
          background-color: #fff0f0
      }
  `]
})
export class RegisterComponent {
    form;

    constructor(private fb: FormBuilder) {
        this.form = fb.group ({
             firstName: ['', Validators.required],
             lastName: ['', Validators.required],
             email: ['', Validators.required],
             password: ['', Validators.required],
             confirmPassword: ['', Validators.required]
        }, { validator: matchingFields('password', 'confirmPassword')})
    }

    onSubmit() {
        console.log(this.form.errors);
    }

    isValid(index) {
        return this.form.controls[index].invalid && this.form.controls[index].touched;
    }

}

function matchingFields(field1, field2) {
    return form => {
        if (form.controls[field1].value != form.controls[field2].value)
            return {mismatchedFields: true}
    }
}
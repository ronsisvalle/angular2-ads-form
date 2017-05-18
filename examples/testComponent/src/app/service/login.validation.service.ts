import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
@Injectable()
export class LoginValidation {
  private fb = new FormBuilder();
  login : FormGroup = this.fb.group({
    'username': ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
    ]
    ],
    'password': ["", [
      Validators.required,
      Validators.minLength(3)
    ]
    ]
  })
}

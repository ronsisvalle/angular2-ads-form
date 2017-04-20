import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Injectable()
export class LoginValidation {
  private fb = new FormBuilder();
  login:FormGroup =this.fb.group({
      'username': ["Nome richiesto !", [
          Validators.required
        ]
      ]})
}
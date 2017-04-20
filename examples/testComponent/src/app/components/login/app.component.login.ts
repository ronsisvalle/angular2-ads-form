import { Component } from '@angular/core';
import { LoginValidation } from '../../service/login.validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.login.html',
  styleUrls: ['./app.component.login.css'],
  providers: [LoginValidation]
})
export class AppComponent {
  /**
 * Comment for method ´doSomething´.
 * @param target  Comment for parameter ´target´.
 * @returns       Comment for return value.
 */
  constructor(private formUnoValidationRules: LoginValidation){

  }
  
  title = 'Giovanni!';
}

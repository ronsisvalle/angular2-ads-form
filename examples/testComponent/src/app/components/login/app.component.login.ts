import {Component} from '@angular/core';
import {LoginValidation} from '../../service/login.validation.service';
import {TranslateService} from 'ng2-translate';
import {AdsFormService} from 'angular2-ads-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.login.html',
  styleUrls: ['./app.component.login.css'],
  providers: [LoginValidation, AdsFormService]
})
export class AppComponent {
  /**
   * Comment for method ´doSomething´.
   * @param target  Comment for parameter ´target´.
   * @returns       Comment for return value.
   */
  title                   : string  = "ADS Form Validator";
  formIsValid             : boolean = false;

  constructor( private formUnoValidationRules: LoginValidation, translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  actionValid(paramData) {
    this.formIsValid = paramData;
  }

  ngAfterViewInit() {
    AdsFormService.getFormController("login").subscribe(
      data => this.actionValid(data),
      err => console.log(err));
  }
}

# angular2-ads-form
Reactive form validation and message features library for Angular 2+.

Simple example using angular2-ads-form: https://plnkr.co/edit/s1TZKMILlXSTmT0SIfIS?p=preview

**This is the documentation for the 1.x version.

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [FAQ](#faq)
* [Plugins](#plugins)


## Installation

First you need to install the npm module:

```sh
npm install angular2-ads-form --save
```

**If you use SystemJS** to load your files, you can check the [plunkr example](https://plnkr.co/edit/s1TZKMILlXSTmT0SIfIS?p=preview) for a working setup that uses the cdn [https://unpkg.com/](https://unpkg.com/).
## Usage

#### 1. Import the `AdsFormModule`:

Finally, you can use angular2-ads-form in your Angular project. You have to import `AdsFormModule`, for traslate service import `TranslateModule` in the root NgModule of your application.

Make sure you only call this method in the root module of your application, most of the time called `AppModule`.
Here is how you would use the `TranslateHttpLoader` to load translations from "/assets/i18n/[lang].json" (`[lang]` is the lang that you're using, for english it could be `en`):
```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AdsFormModule } from 'angular2-ads-form';
import {TranslateModule, TranslateStaticLoader,TranslateLoader} from "ng2-translate";
export function translateLoaderFactory(http: any) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: translateLoaderFactory,
      deps: [Http]
    }),
    AdsFormModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

##### SharedModule

If you use a [`SharedModule`](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-modules) that you import in multiple other feature modules,
you can export the `AdsFormModule` to make sure you don't have to import it in every module.

```ts
@NgModule({
    exports: [
        CommonModule,
        AdsFormModule
    ]
})
export class SharedModule { }
```

> Note: Never call a `forRoot` static method in the `SharedModule`. You might end up with different instances of the service in your injector tree. But you can use `forChild` if necessary.

#### 1. Init the `Validation Service` for your application:
```ts
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

```

#### 2. Define the error message:

Once you've imported the `TranslateModule`, you can put your translations in a json file . The following error message should be stored in `./assets/i18n/en.json`.

```json
{
  "validation.input.username.required": "Name required",
  "validation.input.username.minlength": "Min length 3",
  "validation.input.username.maxlength": "Max length 10",
  "validation.input.password.required": "Password required",
  "validation.input.password.minlength": "Min length 3"
}
```

#### 3. Define component :

```ts
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
  formIsValid             : boolean = false;

  constructor( public formValidationRules: LoginValidation, translate: TranslateService) {
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
```
```html
 <ads-form name="login" [formValidationRules]="formValidationRules">
  <ads-form-input nome="username" label="Username" placeholder="Username"></ads-form-input>
  <ads-form-input nome="password" label="Password" placeholder="Password"></ads-form-input>
  <div class="col-xs-12">
    <button type="submit" class="btn btn-md btn-primary btn-block" [disabled]="!formIsValid">Save</button>
  </div>
</ads-form>
```
#### 4. Use the service:

You can know if the form is valid using the AdsFormService.
With the **service**, it looks like this:

```ts
 actionValid(paramData) {
    this.formIsValid = paramData;
  }
 AdsFormService.getFormController("login").subscribe(
      data => this.actionValid(data),
      err => console.log(err));
  }
```
```html
 <button type="submit" class="btn btn-md btn-primary btn-block" [disabled]="!formIsValid">Save</button>
```

## API

#### Methods:
- `getFormController(nameForm: string): Observable<boolean>`: Gets an boolean of the current validation from. 
## FAQ

#### I'm getting an error `npm ERR! peerinvalid Peer [...]`
If you're using npm 2.x, upgrade to npm 3.x, because npm 2 doesn't handle peer dependencies well. With npm 2 you could only use fixed versions, but with npm 3 you can use `^` to use a newer version if available.

If you're already on npm 3, check if it's an error (`npm ERR!`) or a warning (`npm WARN!`), warning are just informative and if everything works then don't worry !

If you're using an old version of Angular and ngx-translate requires a newer version then you should consider upgrading your application to use the newer angular 2 version. There is always a reason when I upgrade the minimum dependencies of the library. Often it is because Angular had a breaking changes. If it's not an option for you, then check [the changelog](/releases) to know which version is the last compatible version for you.
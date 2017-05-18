import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule ,TranslateService} from 'ng2-translate';
import { AdsForm } from './ads.component.form';
import { AdsFormInput } from './ads.component.inputForm';
import { AdsFormService } from './service/ads.service.form';
import { FormElement } from './interface/ads.interface.form.element';

export * from './ads.component.form';
export {AdsFormService} from './service/ads.service.form';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule 
  ],
  declarations: [
    AdsForm,
    AdsFormInput
  ],
  exports: [
    AdsForm,
    AdsFormInput
  ]
})
export class AdsFormModule {
  static forRoot(providedLoader?: any): ModuleWithProviders {
    return {
      ngModule: AdsFormModule,
      providers: [AdsFormService]
    };
  }

  static forChild(providedLoader?: any): ModuleWithProviders {
    return {
      ngModule: AdsFormModule,
      providers: [AdsFormService]
    };
  }
}

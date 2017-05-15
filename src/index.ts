import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsForm } from './ads.component.form';
import { AdsFormInput } from './ads.component.inputForm';
import { FormElement } from './interface/ads.interface.form.element';

export * from './ads.component.form';

@NgModule({
  imports: [
    CommonModule
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdsFormModule,
      //providers: [SampleService]
    };
  }
}

import { ModuleWithProviders } from '@angular/core';
export * from './ads.component.form';
export { AdsFormService } from './service/ads.service.form';
export declare class AdsFormModule {
    static forRoot(providedLoader?: any): ModuleWithProviders;
    static forChild(providedLoader?: any): ModuleWithProviders;
}

import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement } from './interface/ads.interface.form.element';
import { TranslateService } from 'ng2-translate';
import { Subject } from 'rxjs';
export declare class AdsForm implements OnInit {
    name: string;
    formValidationRules: FormGroup;
    formController: FormGroup;
    formIsValid: Subject<boolean>;
    private formInputElement;
    private translateService;
    constructor(translate?: TranslateService);
    private overload_constructor();
    private buildForm(model?);
    protected addFormInput(paramElement: FormElement): void;
    private checkAllElementIsValid();
    private defaultValidationMessages;
    private onValueChanged(data?);
    ngOnInit(): void;
}

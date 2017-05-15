import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement } from './interface/ads.interface.form.element';
export declare class AdsForm implements OnInit {
    name: string;
    formValidationRules: FormGroup;
    formController: FormGroup;
    formInputElement: Array<FormElement>;
    constructor();
    buildForm(model?: Object): void;
    validationMessages: {
        'username': {
            'required': string;
        };
    };
    onValueChanged(data?: any): void;
    ngOnInit(): void;
}

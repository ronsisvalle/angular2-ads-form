import { OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AdsForm } from './ads.component.form';
import { FormElement } from './interface/ads.interface.form.element';
export declare class AdsFormInput extends AdsForm implements OnInit, FormElement {
    private parent;
    nome: string;
    label: string;
    placeholder: string;
    errors: Array<string>;
    formController: FormGroup;
    eleController: AbstractControl;
    required: boolean;
    constructor(parent: AdsForm);
    ngOnInit(): void;
    private isRequired(paramElement);
}

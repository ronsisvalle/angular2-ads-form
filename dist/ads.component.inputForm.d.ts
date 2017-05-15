import { OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AdsForm } from './ads.component.form';
import { FormElement } from './interface/ads.interface.form.element';
export declare class AdsFormInput implements OnInit, FormElement {
    private parent;
    nome: string;
    label: string;
    errors: Array<string>;
    formController: FormGroup;
    eleController: AbstractControl;
    constructor(parent: AdsForm);
    ngOnInit(): void;
}

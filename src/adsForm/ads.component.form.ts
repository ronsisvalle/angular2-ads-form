import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormElement } from './interface/ads.interface.form.element';
@Component({
    selector: 'ads-form',
    template: "<form  [formGroup]='formController' ><ng-content></ng-content></form>",
    styles: [``]
})
export class AdsForm implements OnInit {
    @Input() name: string;
    @Input() formValidationRules: FormGroup;
    formController: FormGroup;
    formInputElement: Array<FormElement>;
    constructor() {
        this.formInputElement = [];
    };


    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)

    buildForm(model?: Object): void {
        this.formController = this.formValidationRules[this.name];
        this.formController.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(model); // (re)set validation messages now
    }


    validationMessages = {
        'username': {
            'required': 'Name is required.'
        }
    };
    onValueChanged(data?: any) {
        if (!this.formController) { return; }
        const form = this.formController;

        for (const index in this.formInputElement) {
            // clear previous error message (if any)
            let formElement = this.formInputElement[index];
            const control = form.get(formElement.nome);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[formElement.nome];
                for (const key in control.errors) {
                   // control.errors.push(messages[key]);
                }
            }
        }
    }
    ngOnInit() {
        this.buildForm();
    }

}

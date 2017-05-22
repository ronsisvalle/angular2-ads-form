import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl,FormGroup } from '@angular/forms';
import { AdsForm } from './ads.component.form';
import { FormElement } from './interface/ads.interface.form.element';
@Component({
    selector        : "ads-form-input",
    templateUrl     : './template/form-input-template.html',
    styleUrls       : ['./styles.css']
})
export class AdsFormInput extends AdsForm implements OnInit,FormElement {
    @Input() nome           : string;
    @Input() label          : string;
    @Input() placeholder    : string;
    errors              : Array<string>;
    formController      : FormGroup;
    eleController       : AbstractControl;
    required    : boolean;
    constructor(private parent: AdsForm) {
        super();
        this.errors = [];
    }

    ngOnInit() {
        this.formController = this.parent.formController;
        this.eleController  = this.formController.get(this.nome);
        this.required       = this.isRequired(this);
        this.addFormInput(this);

        //this.parent.formInputElement.push(this);
        //console.log("REQUIRED "+this.formValidationRules[this.nome].required);
    }

    private isRequired(paramElement:FormElement): boolean{
        var ret:boolean     = false;
        if(this.eleController && this.eleController.validator(this.eleController) && this.eleController.validator(this.eleController).required){
            ret = true;
        }
        console.log("Is Re "+paramElement.nome + "required "+ ret);
        return ret;
    }


}



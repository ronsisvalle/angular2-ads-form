import { Component, OnInit, Input } from '@angular/core';
import { NgForm,AbstractControl,FormGroup ,FormControlName} from '@angular/forms';
import { AdsForm } from './ads.component.form';
import { FormElement } from './interface/ads.interface.form.element';
@Component({
    selector: "ads-form-input",
    templateUrl: "./template/form-input-template.html"
})
export class AdsFormInput implements OnInit,FormElement {
    @Input() nome  : string;
    @Input() label : string;
    errors         : Array<string>;    
    formController : FormGroup;
    eleController  : AbstractControl;
    constructor(private parent: AdsForm) {
        this.errors = [];
        
    }
    ngOnInit() {
        this.formController = this.parent.formController;
        this.eleController  = this.formController.get(this.nome);
        console.dir(this.parent.formController);
        console.dir(this.parent.formValidationRules);
        this.parent.formInputElement.push(this);
    }
  
}

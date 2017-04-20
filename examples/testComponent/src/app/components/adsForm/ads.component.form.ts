import {Component,OnInit,Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
    selector: 'ads-form',
    template:" <form [formGroup]='formController' ><ng-content></ng-content></form>",
    styles: [``]
})
export class AdsForm implements OnInit{
    @Input() name                : string;
    @Input() formValidationRules : FormGroup;
    formController               : FormGroup;

    constructor() {
        
    };
    
     buildForm(): void {
        this.formController = this.formValidationRules;
    }

     ngOnInit() {
       console.log("Nome form "+this.name);
       console.dir("Nome form "+this.formValidationRules);
       this.buildForm();
    }

  
}

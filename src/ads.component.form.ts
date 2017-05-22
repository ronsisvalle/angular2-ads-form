import { Component, OnInit, Input } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FormElement } from './interface/ads.interface.form.element';
import { TranslateService} from 'ng2-translate';
import {BehaviorSubject,Subject} from 'rxjs';
import { AdsFormService} from './service/ads.service.form';
@Component({
    selector: 'ads-form',
    template: "<form  [formGroup]='formController' ><ng-content></ng-content></form>"
})
export class AdsForm implements OnInit {
    @Input()    name                 : string;
    @Input()    formValidationRules  : FormGroup;
    public      formController       : FormGroup;
    public      formIsValid          : Subject<boolean>     = new BehaviorSubject<boolean>(false);
    private     formInputElement     : Array<FormElement>   = [];
    private     translateService     : TranslateService;

    constructor(translate?: TranslateService) {
        if(translate){
            this.formInputElement = [];
            this.translateService = translate;
        }
      this.overload_constructor();
    };

    private overload_constructor() {
        //this.buildForm();
    };
    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    private buildForm(model?: Object): void {
        this.formController = this.formValidationRules[this.name];
        this.formController.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(model); // (re)set validation messages now
        AdsFormService.addForm(this);
    }

    protected addFormInput(paramElement:FormElement): void{
        if(paramElement){
            this.formInputElement.push(paramElement);
        }
    }

    private checkAllElementIsValid(): boolean {
        let ret:boolean = false;
        if(this.formInputElement && this.formInputElement.length > 0){
            ret = this.formInputElement.every( (value:FormElement) => {
                return value.eleController.valid;
            });
        }
        return ret;
    }
    private defaultValidationMessages = {
        'required' : 'is required.',
        'minlength': 'min size is invalid.',
        'maxlength': 'mia size is invalid.'
    };
    private onValueChanged(data?: any) {
        if (!this.formController) { return; }
        const form = this.formController;
        this.formIsValid.next(this.checkAllElementIsValid());

        for (const index in this.formInputElement) {
            // clear previous error message (if any)
            let formElement = this.formInputElement[index];
            const control = form.get(formElement.nome);

            if (control && control.dirty && !control.valid) {
                formElement.errors  = [];
                for (const key in control.errors) {
                     let pathMessLbl  = "validation.input."+formElement.nome+"."+key;
                     let strMessError = "";
                     this.translateService.get(pathMessLbl).subscribe((res: string) => {
                         if(pathMessLbl != res){
                            strMessError = res;
                         }else{
                             strMessError = formElement.nome +" "+ (this.defaultValidationMessages[key] || "Invalid");
                             console.error("Error message label is undefined -> "+pathMessLbl);
                         }
                     });
                    if(strMessError){
                        formElement.errors.push(strMessError);
                    }
                }
            }
        }
    }
     ngOnInit() {
        this.buildForm();
    }

}
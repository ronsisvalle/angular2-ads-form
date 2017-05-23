import { Component, Injectable, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/share';

var AdsFormService = (function () {
    function AdsFormService() {
    }
    /**
     * @param {?} paramForm
     * @return {?}
     */
    AdsFormService.addForm = function (paramForm) {
        this.mapAdsForm.set(paramForm.name, paramForm);
    };
    /**
     * @param {?} paramForm
     * @return {?}
     */
    AdsFormService.getFormController = function (paramForm) {
        var /** @type {?} */ ret;
        if (paramForm) {
            var /** @type {?} */ tempForm = this.mapAdsForm.get(paramForm);
            if (tempForm && tempForm.formController) {
                ret = tempForm.formIsValid;
            }
            else {
                console.error("Form <" + paramForm + "> is undefined !");
            }
        }
        return ret;
    };
    return AdsFormService;
}());
AdsFormService.mapAdsForm = new Map();
AdsFormService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AdsFormService.ctorParameters = function () { return []; };

var AdsForm = (function () {
    /**
     * @param {?=} translate
     */
    function AdsForm(translate) {
        this.formIsValid = new BehaviorSubject(false);
        this.formInputElement = [];
        this.defaultValidationMessages = {
            'required': 'is required.',
            'minlength': 'min size is invalid.',
            'maxlength': 'mia size is invalid.'
        };
        if (translate) {
            this.formInputElement = [];
            this.translateService = translate;
        }
        this.overload_constructor();
    }
    
    /**
     * @return {?}
     */
    AdsForm.prototype.overload_constructor = function () {
        //this.buildForm();
    };
    
    /**
     * @param {?=} model
     * @return {?}
     */
    AdsForm.prototype.buildForm = function (model) {
        var _this = this;
        this.formController = this.formValidationRules[this.name];
        this.formController.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(model); // (re)set validation messages now
        AdsFormService.addForm(this);
    };
    /**
     * @param {?} paramElement
     * @return {?}
     */
    AdsForm.prototype.addFormInput = function (paramElement) {
        if (paramElement) {
            this.formInputElement.push(paramElement);
        }
    };
    /**
     * @return {?}
     */
    AdsForm.prototype.checkAllElementIsValid = function () {
        var /** @type {?} */ ret = false;
        if (this.formInputElement && this.formInputElement.length > 0) {
            ret = this.formInputElement.every(function (value) {
                return value.eleController.valid;
            });
        }
        return ret;
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    AdsForm.prototype.onValueChanged = function (data) {
        var _this = this;
        if (!this.formController) {
            return;
        }
        var /** @type {?} */ form = this.formController;
        this.formIsValid.next(this.checkAllElementIsValid());
        var _loop_1 = function (index) {
            // clear previous error message (if any)
            var /** @type {?} */ formElement = this_1.formInputElement[index];
            var /** @type {?} */ control = form.get(formElement.nome);
            if (control && control.dirty && !control.valid) {
                formElement.errors = [];
                var _loop_2 = function (key) {
                    var /** @type {?} */ pathMessLbl = "validation.input." + formElement.nome + "." + key;
                    var /** @type {?} */ strMessError = "";
                    this_1.translateService.get(pathMessLbl).subscribe(function (res) {
                        if (pathMessLbl != res) {
                            strMessError = res;
                        }
                        else {
                            strMessError = formElement.nome + " " + (_this.defaultValidationMessages[key] || "Invalid");
                            console.error("Error message label is undefined -> " + pathMessLbl);
                        }
                    });
                    if (strMessError) {
                        formElement.errors.push(strMessError);
                    }
                };
                for (var /** @type {?} */ key in control.errors) {
                    _loop_2(/** @type {?} */ key);
                }
            }
        };
        var this_1 = this;
        for (var /** @type {?} */ index in this.formInputElement) {
            _loop_1(/** @type {?} */ index);
        }
    };
    /**
     * @return {?}
     */
    AdsForm.prototype.ngOnInit = function () {
        this.buildForm();
    };
    return AdsForm;
}());
AdsForm.decorators = [
    { type: Component, args: [{
                selector: 'ads-form',
                template: "<form  [formGroup]='formController' ><ng-content></ng-content></form>"
            },] },
];
/**
 * @nocollapse
 */
AdsForm.ctorParameters = function () { return [
    { type: TranslateService, },
]; };
AdsForm.propDecorators = {
    'name': [{ type: Input },],
    'formValidationRules': [{ type: Input },],
};

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AdsFormInput = (function (_super) {
    __extends(AdsFormInput, _super);
    /**
     * @param {?} parent
     */
    function AdsFormInput(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.errors = [];
        return _this;
    }
    /**
     * @return {?}
     */
    AdsFormInput.prototype.ngOnInit = function () {
        this.formController = this.parent.formController;
        this.eleController = this.formController.get(this.nome);
        this.required = this.isRequired(this);
        this.parent.addFormInput(this);
        //this.parent.formInputElement.push(this);
        //console.log("REQUIRED "+this.formValidationRules[this.nome].required);
    };
    /**
     * @param {?} paramElement
     * @return {?}
     */
    AdsFormInput.prototype.isRequired = function (paramElement) {
        var /** @type {?} */ ret = false;
        if (this.eleController && this.eleController.validator(this.eleController) && this.eleController.validator(this.eleController).required) {
            ret = true;
        }
        return ret;
    };
    return AdsFormInput;
}(AdsForm));
AdsFormInput.decorators = [
    { type: Component, args: [{
                selector: "ads-form-input",
                template: "<div class=\"form-group\" [formGroup]=\"formController\"> <label [ngClass]=\"{'required':required}\" for=\"{{nome}}\">{{label}}</label> <input type=\"text\" id=\"{{nome}}\" class=\"form-control\" [formControlName]=\"nome\" name=\"nome\" placeholder=\"{{placeholder}}\"> <div *ngIf=\"eleController.errors && (eleController.dirty)\" class=\"alert alert-danger\"> <div [hidden]=\"!eleController.errors\"> <span>{{errors[errors.length -1]}}</span> </div> </div> </div>",
                styles: [".required:after {  content: '*';  color: red;  }"]
            },] },
];
/**
 * @nocollapse
 */
AdsFormInput.ctorParameters = function () { return [
    { type: AdsForm, },
]; };
AdsFormInput.propDecorators = {
    'nome': [{ type: Input },],
    'label': [{ type: Input },],
    'placeholder': [{ type: Input },],
};

var AdsFormModule = (function () {
    function AdsFormModule() {
    }
    /**
     * @param {?=} providedLoader
     * @return {?}
     */
    AdsFormModule.forRoot = function (providedLoader) {
        return {
            ngModule: AdsFormModule,
            providers: [AdsFormService]
        };
    };
    /**
     * @param {?=} providedLoader
     * @return {?}
     */
    AdsFormModule.forChild = function (providedLoader) {
        return {
            ngModule: AdsFormModule,
            providers: [AdsFormService]
        };
    };
    return AdsFormModule;
}());
AdsFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    TranslateModule,
                    ReactiveFormsModule
                ],
                declarations: [
                    AdsForm,
                    AdsFormInput
                ],
                exports: [
                    AdsForm,
                    AdsFormInput
                ]
            },] },
];
/**
 * @nocollapse
 */
AdsFormModule.ctorParameters = function () { return []; };

export { AdsFormModule, AdsForm, AdsFormService };

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['angular2-ads-form'] = global['angular2-ads-form'] || {}),global._angular_core,global._angular_common));
}(this, (function (exports,_angular_core,_angular_common) { 'use strict';

var AdsForm = (function () {
    function AdsForm() {
        this.validationMessages = {
            'username': {
                'required': 'Name is required.'
            }
        };
        this.formInputElement = [];
    }
    
    /**
     * @param {?=} model
     * @return {?}
     */
    AdsForm.prototype.buildForm = function (model) {
        var _this = this;
        this.formController = this.formValidationRules[this.name];
        this.formController.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(model); // (re)set validation messages now
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    AdsForm.prototype.onValueChanged = function (data) {
        if (!this.formController) {
            return;
        }
        var /** @type {?} */ form = this.formController;
        for (var /** @type {?} */ index in this.formInputElement) {
            // clear previous error message (if any)
            var /** @type {?} */ formElement = this.formInputElement[index];
            var /** @type {?} */ control = form.get(formElement.nome);
            if (control && control.dirty && !control.valid) {
                var /** @type {?} */ messages = this.validationMessages[formElement.nome];
                for (var /** @type {?} */ key in control.errors) {
                    // control.errors.push(messages[key]);
                }
            }
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
    { type: _angular_core.Component, args: [{
                selector: 'ads-form',
                template: "<form  [formGroup]='formController' ><ng-content></ng-content></form>",
                styles: [""]
            },] },
];
/**
 * @nocollapse
 */
AdsForm.ctorParameters = function () { return []; };
AdsForm.propDecorators = {
    'name': [{ type: _angular_core.Input },],
    'formValidationRules': [{ type: _angular_core.Input },],
};

var AdsFormInput = (function () {
    /**
     * @param {?} parent
     */
    function AdsFormInput(parent) {
        this.parent = parent;
        this.errors = [];
    }
    /**
     * @return {?}
     */
    AdsFormInput.prototype.ngOnInit = function () {
        this.formController = this.parent.formController;
        this.eleController = this.formController.get(this.nome);
        console.dir(this.parent.formController);
        console.dir(this.parent.formValidationRules);
        this.parent.formInputElement.push(this);
    };
    return AdsFormInput;
}());
AdsFormInput.decorators = [
    { type: _angular_core.Component, args: [{
                selector: "ads-form-input",
                template: '<div class="form-group" [formGroup]="formController"><label for="nome">{{label}}</label> <input type="text" id="{{nome}}" class="form-control" [formControlName]="nome" name="nome"><div *ngIf="eleController.errors && (eleController.dirty || eleController.touched)" class="alert alert-danger"><div [hidden]="!eleController.errors">cazzo</div></div></div>'
            },] },
];
/**
 * @nocollapse
 */
AdsFormInput.ctorParameters = function () { return [
    { type: AdsForm, },
]; };
AdsFormInput.propDecorators = {
    'nome': [{ type: _angular_core.Input },],
    'label': [{ type: _angular_core.Input },],
};

var AdsFormModule = (function () {
    function AdsFormModule() {
    }
    /**
     * @return {?}
     */
    AdsFormModule.forRoot = function () {
        return {
            ngModule: AdsFormModule,
        };
    };
    return AdsFormModule;
}());
AdsFormModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule
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

exports.AdsFormModule = AdsFormModule;
exports.AdsForm = AdsForm;

Object.defineProperty(exports, '__esModule', { value: true });

})));

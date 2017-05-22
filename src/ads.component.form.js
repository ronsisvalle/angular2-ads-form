"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ads_service_form_1 = require("./service/ads.service.form");
var AdsForm = (function () {
    function AdsForm(translate) {
        this.defaultValidationMessages = {
            'required': 'is required.',
            'minlength': 'min size is invalid.',
            'maxlength': 'mia size is invalid.'
        };
        this.formInputElement = [];
        this.translateService = translate;
        //   this.translateService.setDefaultLang('en');
        //console.dir(translate);
    }
    ;
    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    AdsForm.prototype.buildForm = function (model) {
        var _this = this;
        this.formController = this.formValidationRules[this.name];
        this.formController.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(model); // (re)set validation messages now
        ads_service_form_1.AdsFormService.addForm(this);
    };
    AdsForm.prototype.onValueChanged = function (data) {
        var _this = this;
        if (!this.formController) {
            return;
        }
        var form = this.formController;
        var _loop_1 = function (index) {
            // clear previous error message (if any)
            var formElement = this_1.formInputElement[index];
            var control = form.get(formElement.nome);
            if (control && control.dirty && !control.valid) {
                var messages = this_1.defaultValidationMessages[formElement.nome];
                formElement.errors = [];
                var _loop_2 = function (key) {
                    var pathMessLbl = "validation.input." + formElement.nome + "." + key;
                    var strMessError = "";
                    this_1.translateService.get(pathMessLbl).subscribe(function (res) {
                        console.log(res);
                        if (pathMessLbl != res) {
                            strMessError = res;
                        }
                        else {
                            strMessError = formElement.nome + " " + _this.defaultValidationMessages[key];
                            console.error("Error message label is undefined -> " + pathMessLbl);
                        }
                    });
                    if (strMessError) {
                        formElement.errors.push(strMessError);
                    }
                };
                for (var key in control.errors) {
                    _loop_2(key);
                }
            }
        };
        var this_1 = this;
        for (var index in this.formInputElement) {
            _loop_1(index);
        }
    };
    AdsForm.prototype.ngOnInit = function () {
        this.buildForm();
    };
    return AdsForm;
}());
__decorate([
    core_1.Input()
], AdsForm.prototype, "name", void 0);
__decorate([
    core_1.Input()
], AdsForm.prototype, "formValidationRules", void 0);
AdsForm = __decorate([
    core_1.Component({
        selector: 'ads-form',
        template: "<form  [formGroup]='formController' ><ng-content></ng-content></form>",
        styles: [""]
    })
], AdsForm);
exports.AdsForm = AdsForm;

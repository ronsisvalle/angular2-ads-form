"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/observable/of");
require("rxjs/add/operator/share");
require("rxjs/add/operator/map");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/toArray");
require("rxjs/add/operator/take");
var AdsFormService = (function () {
    function AdsFormService() {
    }
    AdsFormService.addForm = function (paramForm) {
        console.log("Add " + paramForm.name);
        this.mapAdsForm.set(paramForm.name, paramForm);
    };
    AdsFormService.getFormController = function (paramForm) {
        var ret;
        if (paramForm) {
            var tempForm = this.mapAdsForm.get(paramForm);
            if (tempForm && tempForm.formController) {
                ret = tempForm.formController;
            }
        }
        return ret;
    };
    return AdsFormService;
}());
AdsFormService.mapAdsForm = new Map();
AdsFormService = __decorate([
    core_1.Injectable()
], AdsFormService);
exports.AdsFormService = AdsFormService;

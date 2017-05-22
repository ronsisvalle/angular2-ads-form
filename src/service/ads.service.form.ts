
import { Injectable } from "@angular/core";
import { AdsForm } from "../ads.component.form";
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs';
import "rxjs/add/operator/share";

@Injectable()
export class AdsFormService {
    private static mapAdsForm: Map<string, AdsForm> = new Map<string, AdsForm>();

    public static addForm(paramForm: AdsForm): void {
        this.mapAdsForm.set(paramForm.name, paramForm);
    }

    public static getFormController(paramForm: string):Observable<boolean> {
        let ret:Subject<boolean>;
        if (paramForm) {
            let tempForm: AdsForm = this.mapAdsForm.get(paramForm);
            if (tempForm && tempForm.formController) {
                ret =   tempForm.formIsValid;
            }else{
                console.error("Form <"+paramForm+"> is undefined !" );
            }
        }
        return ret;
    }
}
import { AdsForm } from "../ads.component.form";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/share";
export declare class AdsFormService {
    private static mapAdsForm;
    static addForm(paramForm: AdsForm): void;
    static getFormController(paramForm: string): Observable<boolean>;
}

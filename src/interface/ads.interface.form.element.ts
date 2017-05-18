import { AbstractControl} from '@angular/forms';
export interface FormElement {
    nome            : string;
    label           : string;
    eleController   : AbstractControl;
    errors          : Array<string>;
}

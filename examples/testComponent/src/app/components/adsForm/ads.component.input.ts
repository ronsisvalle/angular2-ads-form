import { Component, OnInit, Input } from '@angular/core';
import { AdsForm } from './ads.component.form';
@Component({
    selector: 'ads-form-input',
    templateUrl: "./template/input/input.component.html",
    styles: [``]
})
export class AdsFormInput extends AdsForm implements OnInit {
    @Input() nome: string;
    @Input() label: string;

    super() {

    }

    ngOnInit() {
        console.log("Nome input " + this.nome);
        console.dir("Validation Form " + this.formValidationRules);
        console.dir("Form Controller" + this.formController);
    }


}

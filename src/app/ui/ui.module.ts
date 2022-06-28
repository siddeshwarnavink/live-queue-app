import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonComponent } from "./button/button.component";
import { SpinnerComponent } from './spinner/spinner.component';

const components = [
    ButtonComponent,
    SpinnerComponent
]

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
    ],
    bootstrap: [...components],
    exports: [...components]
})
export class UIModule { }
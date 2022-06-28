import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonComponent } from "./button/button.component";

const components = [
    ButtonComponent
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
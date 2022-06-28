import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ButtonComponent } from "./button/button.component";
import { SpinnerComponent } from './spinner/spinner.component';
import { BottomOverlayComponent } from './bottom-overlay/bottom-overlay.component';
import { BackdropComponent } from './backdrop/backdrop.component';

const components = [
    ButtonComponent,
    SpinnerComponent,
    BottomOverlayComponent,
    BackdropComponent
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
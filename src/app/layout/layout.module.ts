import { NgModule } from "@angular/core";

import { LayoutComponent } from "./layout.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
    declarations: [
        LayoutComponent,
        ToolbarComponent
    ],
    exports: [
        LayoutComponent,
        ToolbarComponent
    ]
})
export class LayoutModule { }
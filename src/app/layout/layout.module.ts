import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LayoutComponent } from "./layout.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

const components = [
    LayoutComponent,
    ToolbarComponent
]

@NgModule({
    declarations: [...components],
    imports: [
        RouterModule,
    ],
    bootstrap: [...components],
    exports: [...components]
})
export class LayoutModule { }
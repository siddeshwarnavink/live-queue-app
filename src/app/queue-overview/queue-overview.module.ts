import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { QueueItemComponent } from "./queue-item/queue-item.component";
import { QueueOverviewComponent } from "./queue-overview.component";

const components = [
    QueueOverviewComponent,
    QueueItemComponent
]

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        RouterModule
    ],
    bootstrap: [...components],
    exports: [...components]
})
export class QueueOverviewModule { }
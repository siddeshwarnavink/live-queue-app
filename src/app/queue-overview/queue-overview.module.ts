import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { QueueItemComponent } from "./queue-item/queue-item.component";
import { QueueOverviewComponent } from "./queue-overview.component";
import { UIModule } from "../ui/ui.module";
import { QueueItemPulseComponent } from './queue-item-pulse/queue-item-pulse.component';

const components = [
    QueueOverviewComponent,
    QueueItemComponent,
    QueueItemPulseComponent
]

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        RouterModule,
        UIModule
    ],
    bootstrap: [...components],
    exports: [...components]
})
export class QueueOverviewModule { }